import { X } from "lucide-react";                       // X icon used for the close button (from lucide-react icon library)
import { useAuthStore } from "../store/useAuthStore";   // Zustand store for authentication — contains onlineUsers list
import { useChatStore } from "../store/useChatStore";   // Zustand store for chat — contains selected user and setter

// ======================================================================
// ChatHeader Component
// Purpose:
// - Displays the currently selected user's info (avatar, name, online status)
// - Shows a close button to unselect the user and return to the chat list
// ======================================================================
const ChatHeader = () => {

    // Extract selected user and setter function from chat store
    const { selectedUser, setSelectedUser } = useChatStore();

    // From auth store — list of user IDs that are currently online
    const { onlineUsers } = useAuthStore();

    return (
        // Container with border at bottom, small padding
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">

                {/* Left side: User avatar + name + online status */}
                <div className="flex items-center gap-3">

                    {/* User avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img
                                src={selectedUser.profilePic || "/avatar.png"} // fallback image
                                alt={selectedUser.fullName}
                            />
                        </div>
                    </div>

                    {/* User information: full name + online/offline indicator */}
                    <div>
                        <h3 className="font-medium">{selectedUser.fullName}</h3>

                        {/* Online state:
                            - onlineUsers contains IDs of all connected users
                            - If selectedUser._id exists in onlineUsers → show "Online"
                        */}
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Right side: Close button (clears selected user) */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />   {/* icon */}
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
