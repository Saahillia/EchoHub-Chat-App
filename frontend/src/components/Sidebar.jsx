import { useEffect, useState } from "react";                        // React Hooks
import { useChatStore } from "../store/useChatStore";               // Zustand store for chat-related data (users, selected user, loading state)
import { useAuthStore } from "../store/useAuthStore";               // Zustand store for authentication (online users list)
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";          // Skeleton placeholder UI shown while contacts are loading
import { Users } from "lucide-react";                               // Icon for "Contacts" header

// ======================================================================
// Sidebar Component
// Purpose:
// - Displays all users in the system (contacts list)
// - Indicates which users are online
// - Highlights the currently selected chat user
// - Allows filtering to "online only" users
// ======================================================================
const Sidebar = () => {

    // Extract chat store values/actions
    const {
        getUsers,           // fetch list of users from backend
        users,              // all users except logged-in user
        selectedUser,       // currently selected user
        setSelectedUser,    // selects a user for chatting
        isUsersLoading,     // loading state for skeleton
    } = useChatStore();

    // From auth store: IDs of online users
    const { onlineUsers } = useAuthStore();

    // Toggle for showing only online users
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);


    // ==================================================================
    // Fetch users when the sidebar loads
    // ==================================================================
    useEffect(() => {
        getUsers();
    }, [getUsers]);


    // ==================================================================
    // Filter users if "show online only" is enabled
    // ==================================================================
    const filteredUsers = showOnlineOnly
        ? users.filter(user => onlineUsers.includes(user._id))
        : users;


    // ==================================================================
    // Show skeleton loader while users are loading
    // ==================================================================
    if (isUsersLoading) return <SidebarSkeleton />;


    // ==================================================================
    // Main Sidebar UI
    // ==================================================================
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">

            {/* ===== Sidebar Header ===== */}
            <div className="border-b border-base-300 w-full p-5">

                {/* Title */}
                <div className="flex items-center gap-2">
                    <Users className="size-6 animate-pulse" />

                    {/* Hidden on small screens to keep layout compact */}
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>


                {/* Online users toggle (only visible on large screens) */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">

                        {/* Checkbox for filtering */}
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm"
                        />

                        <span className="text-sm">Show online only</span>
                    </label>

                    {/* Shows how many online users exist (minus yourself) */}
                    <span className="text-xs text-zinc-500">
                        ({onlineUsers.length - 1} online)
                    </span>
                </div>
            </div>


            {/* ===== Users List ===== */}
            <div className="overflow-y-auto w-full py-3">

                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)} // Select user to chat with
                        className={`
                            w-full p-3 flex items-center gap-3
                            hover:bg-base-300 transition-colors
                            ${
                                selectedUser?._id === user._id
                                    ? "bg-base-300 ring-1 ring-base-300"
                                    : ""
                            }
                        `}
                    >

                        {/* Avatar with online indicator */}
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.name}
                                className="w-12 h-12 object-cover rounded-full"
                            />

                            {/* Green dot for online users */}
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                                    rounded-full ring-2 ring-zinc-900"
                                />
                            )}
                        </div>

                        {/* User information (only shown on large screens) */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{user.fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {/* Empty state for online filter */}
                {filteredUsers.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
