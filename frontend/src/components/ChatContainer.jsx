import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unSubscribeFromMessages,
    } = useChatStore();

    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    useEffect(() => {
        if (!selectedUser || !selectedUser._id) return;

        console.log("Fetching messages for:", selectedUser._id);
        getMessages(selectedUser);
        subscribeToMessages();

        return () => unSubscribeFromMessages();
    }, [selectedUser, getMessages, subscribeToMessages, unSubscribeFromMessages]);

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

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const isUserAtBottom = scrollHeight - scrollTop - clientHeight < 100;
        setIsAtBottom(isUserAtBottom);
    };

    useEffect(() => {
        if (isAtBottom && messageEndRef.current) {
        messageEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
        }
    }, [messages, isAtBottom]);

    if (isMessagesLoading) {
        return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />

        <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{
            scrollBehavior: "smooth", 
            }}
            onScroll={handleScroll}
        >
            {messages.map((message) => (
            <div
                key={message._id}
                className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
            >
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

                <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                </time>
                </div>

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

            <div ref={messageEndRef}></div>
        </div>

        <MessageInput />
        </div>
    );
};

export default ChatContainer;
