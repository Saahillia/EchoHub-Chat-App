import { useRef, useState } from "react";                       // React hooks
import { useChatStore } from "../store/useChatStore";           // Zustand store for sending messages
import { Image, Send, X } from "lucide-react";                  // Icons from lucide-react
import toast from "react-hot-toast";                            // Toast notifications for warnings/errors



// ======================================================================
// MessageInput Component
// Purpose:
// - Allows user to send text messages
// - Supports attaching and previewing images before sending
// - Integrates with Zustand chat store to send messages to the backend
// ======================================================================
const MessageInput = () => {

    // Text state for message input
    const [text, setText] = useState("");

    // Preview of the selected image (base64)
    const [imagePreview, setImagePreview] = useState(null);

    // Reference to the hidden file input
    const fileInputRef = useRef(null);

    // Send message action from Zustand store
    const { sendMessages } = useChatStore();


    // ==================================================================
    // Handle selecting an image from file input
    // Converts the selected file → base64 string using FileReader
    // ==================================================================
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Validate that selected file is an image
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Convert image file to Base64 for preview + sending to backend
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result); // base64 string
        };
        reader.readAsDataURL(file);
    };


    // ==================================================================
    // Remove selected image
    // Clears preview + resets file input element
    // ==================================================================
    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };


    // ==================================================================
    // Handle the form submission (send message)
    // ==================================================================
    const handleSendMessage = async (e) => {
        e.preventDefault();

        // Prevent sending empty messages
        if (!text.trim() && !imagePreview) return;

        try {
            // Send message to backend (text + optional image)
            await sendMessages({
                text: text.trim(),
                image: imagePreview,
            });

            // Reset input fields
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

        } catch (error) {
            console.error("Failed to send message", error);
        }
    };


    // ==================================================================
    // UI Component Rendering
    // ==================================================================
    return (
        <div className="p-4 w-full">

            {/* Image preview section (only visible if user selected a picture) */}
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        {/* Remove image button */}
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main form: Text input + Image upload + Send button */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">

                    {/* Text input field */}
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    {/* Hidden file input for uploading images */}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    {/* Button to trigger hidden file input */}
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle ${
                            imagePreview ? "text-emerald-500" : "text-zinc-400"
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>

                {/* Send Message button */}
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={!text.trim() && !imagePreview} // prevent empty sends
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
