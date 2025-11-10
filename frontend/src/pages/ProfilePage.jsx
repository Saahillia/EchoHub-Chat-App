import { useAuthStore } from "../store/useAuthStore.js";
import { useState, useRef, useEffect } from "react";
import { Camera, Mail, User, X } from "lucide-react";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const [borderColor, setBorderColor] = useState("#ccc");
    const [isViewing, setIsViewing] = useState(false);
    const imgRef = useRef(null);
    const [zoom, setZoom] = useState(1);

    // Extract dominant color for border
    useEffect(() => {
        const imgElement = imgRef.current;
        if (!imgElement) return;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = selectedImg || authUser.profilePic || "/avatar.png";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const data = ctx.getImageData(0, 0, img.width, img.height).data;

            let r = 0, g = 0, b = 0, count = 0;
            for (let i = 0; i < data.length; i += 40) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);
            setBorderColor(`rgb(${r}, ${g}, ${b})`);
        };
    }, [selectedImg, authUser.profilePic]);

    // Handle image upload (resized + compressed)
    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = async () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1500; // only resize if very large
        const scaleSize = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;

        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const highQualityBase64 = canvas.toDataURL("image/jpeg", 0.95);
        setSelectedImg(highQualityBase64);
        await updateProfile({ profilePic: highQualityBase64 });
        };
    };
};

    // Handle scroll zoom
    const handleWheelZoom = (e) => {
        e.preventDefault();
        setZoom((prev) => {
            let newZoom = prev + (e.deltaY < 0 ? 0.1 : -0.1);
            return Math.min(Math.max(newZoom, 1), 2); // Clamp between 1x and 2x
        });
    };

    return (
        <div className="h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Profile</h1>
                        <p className="mt-2 ">Your profile information</p>
                    </div>

                    {/* Avatar upload */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                ref={imgRef}
                                src={selectedImg || authUser.profilePic || "/avatar.png"}
                                alt="Profile"
                                onClick={() => setIsViewing(true)}
                                className="size-32 rounded-full object-cover border-4 transition-all duration-500 cursor-pointer hover:scale-105 hover:opacity-90"
                                style={{ borderColor }}
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`
                                    absolute bottom-0 right-0 
                                    bg-base-content hover:scale-105
                                    p-2 rounded-full cursor-pointer 
                                    transition-all duration-200
                                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                                `}
                            >
                                <Camera className="w-5 h-5 text-base-200" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm ">
                            {isUpdatingProfile
                                ? "Uploading image..."
                                : "Click the photo to view or camera icon to update"}
                        </p>
                    </div>

                    {/* Profile info */}
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-500 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </div>
                            <p className="px-4 py-2.5 bg-base-content/10 rounded-lg border">
                                {authUser?.fullName}
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-500 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </div>
                            <p className="px-4 py-2.5 bg-base-content/10 rounded-lg border">
                                {authUser?.email}
                            </p>
                        </div>
                    </div>

                    {/* Account info */}
                    <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className="text-lg font-medium mb-4">Account Information</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>Member Since</span>
                                <span>{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-green-500">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Image Popup */}
            {isViewing && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setIsViewing(false)}
                    onWheel={handleWheelZoom}
                >
                    <div className="relative">
                        <div
                            className="w-72 h-72 md:w-96 md:h-96 rounded-full border-4 shadow-2xl overflow-hidden flex items-center justify-center bg-gradient-to-tr from-sky-400 to-indigo-500"
                            style={{ borderColor }}
                        >
                            <img
                                src={selectedImg || authUser.profilePic || "/avatar.png"}
                                alt="Full Profile"
                                className="rounded-full object-cover transition-transform duration-300 ease-in-out"
                                style={{
                                    transform: `scale(${zoom})`,
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </div>

                        <button
                            onClick={() => setIsViewing(false)}
                            className="absolute -top-10 right-0 bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-opacity-90 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
