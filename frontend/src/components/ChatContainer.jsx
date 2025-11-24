// Zustand store that holds all chat-related state and actions
import { useChatStore } from "../store/useChatStore";

// React utilities
import { useEffect, useRef, useState } from "react";

// Reusable UI components
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";

// Authentication store for current logged-in user
import { useAuthStore } from "../store/useAuthStore";

// Utility to format message timestamps (e.g., "2:49 PM")
import { formatMessageTime } from "../lib/utils";


// ======================================================================
// ChatContainer Component
// Purpose:
// - Displays messages between logged-in user and selected user
// - Handles scrolling, auto-scroll, message loading animations
// - Subscribes to realtime message updates via WebSocket
// ======================================================================
const ChatContainer = () => {

    // Extract chat-related state & actions from the store
    const {
        messages,                // Array of messages for the current chat
        getMessages,             // Fetch messages from backend
        isMessagesLoading,       // Loading state for skeleton UI
        selectedUser,            // User currently selected from sidebar
        subscribeToMessages,     // Setup WebSocket listener for new messages
        unSubscribeFromMessages, // Cleanup WebSocket listener
    } = useChatStore();

    // Logged-in user's data
    const { authUser } = useAuthStore();

    // Ref to auto-scroll to bottom of chat
    const messageEndRef = useRef(null);

    // Track whether the user is scrolled near the bottom
    const [isAtBottom, setIsAtBottom] = useState(true);


    // ==================================================================
    // Fetch messages + subscribe to real-time updates when user changes
    // ==================================================================
    useEffect(() => {
        // If no user selected, do nothing
        if (!selectedUser || !selectedUser._id) return;

        console.log("Fetching messages for:", selectedUser._id);

        // Fetch chat history from backend
        getMessages(selectedUser);

        // Subscribe to new WebSocket messages for real-time updates
        subscribeToMessages();

        // Cleanup subscription on unmount or when selected user changes
        return () => unSubscribeFromMessages();

    }, [selectedUser, getMessages, subscribeToMessages, unSubscribeFromMessages]);


    // ==================================================================
    // Auto-scroll to bottom when messages change
    // Small timeout ensures DOM elements fully render before scrolling
    // ==================================================================
    useEffect(() => {
        if (messageEndRef.current && messages.length > 0) {
            const timer = setTimeout(() => {
                messageEndRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }, 150);

            return () => clearTimeout(timer);
        }
    }, [messages.length, selectedUser]);


    // ==================================================================
    // Detect if user is at bottom (to avoid interrupting manual scrolling)
    // ==================================================================
    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;

        // Check if user is within 100px of the bottom
        const isUserAtBottom = scrollHeight - scrollTop - clientHeight < 100;

        setIsAtBottom(isUserAtBottom);
    };


    // ==================================================================
    // Auto-scroll ONLY if user is already at bottom
    // Prevents jumpy scrolling when user is reading older messages
    // ==================================================================
    useEffect(() => {
        if (isAtBottom && messageEndRef.current) {
            messageEndRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [messages, isAtBottom]);


    // ==================================================================
    // Show skeleton loader if messages are still loading
    // ==================================================================
    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }


    // ==================================================================
    // MAIN CHAT UI
    // ==================================================================
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            {/* Message List */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{ scrollBehavior: "smooth" }}
                onScroll={handleScroll}
            >

                {/* Loop through all messages */}
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${
                            message.senderId === authUser._id
                                ? "chat-end"   // align right (sent by me)
                                : "chat-start" // align left (received)
                        }`}
                    >
                        {/* Avatar */}
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.senderId === authUser._id
                                            ? authUser.profilePic || "/avatar.png"
                                            : selectedUser.profilePic || "/avatar.png"
                                    }
                                    alt="profile pic"
                                    className="object-cover rounded-full"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Timestamp */}
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>

                        {/* Message bubble (text + optional image) */}
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2 object-contain transition-opacity duration-200"
                                    loading="lazy"
                                />
                            )}

                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}

                {/* Reference element for auto-scrolling */}
                <div ref={messageEndRef}></div>
            </div>

            {/* Message input box */}
            <MessageInput />
        </div>
    );
};

export default ChatContainer;
