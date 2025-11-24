import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

/**
 * Zustand Store: Chat / Messaging State
 * -------------------------------------
 * This store manages:
 * - Messages for the selected conversation
 * - List of all users available for chat
 * - Selected user in the sidebar
 * - Loading states for sidebar + messages
 * - Sending and receiving messages in real time
 * - WebSocket subscription to live incoming messages
 */
export const useChatStore = create((set, get) => ({
    /** All chat messages between current user and selected user */
    messages: [],

    /** All users available for chat */
    users: [],

    /** User currently selected in sidebar */
    selectedUser: null,

    /** Loading indicators */
    isUsersLoading: false,
    isMessagesLoading: false,

    /**
     * getUsers()
     * ----------
     * Fetches the list of users from backend for the chat sidebar.
     * - Shows skeleton while loading
     * - Handles API errors gracefully using toasts
     */
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    /**
     * getMessages(user)
     * -----------------
     * Loads the chat history between the logged-in user
     * and the selected user.
     *
     * - Ensures selected user is valid
     * - Shows message skeleton during loading
     */
    getMessages: async (user) => {
        if (!user || !user._id) {
            console.log("No valid user to fetch messages for.");
            return;
        }

        // Set selected user + enable message loading state
        set({ isMessagesLoading: true, selectedUser: user });

        try {
            console.log("Fetching messages for user:", user._id);
            const res = await axiosInstance.get(`/messages/${user._id}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    /**
     * sendMessages(messageData)
     * --------------------------
     * Sends text or image messages to backend.
     *
     * - Adds newly sent message to UI instantly
     * - Prevents UI freeze before backend responds
     */
    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                messageData
            );
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    /**
     * subscribeToMessages()
     * ----------------------
     * Subscribes to `"newMessage"` socket events from backend.
     *
     * When a new message is received:
     * - Verifies that the message belongs to the currently opened chat
     * - Appends it to the existing message list
     *
     * Real-time messaging relies on the socket created in `useAuthStore`.
     */
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageFromSelectedUser =
                newMessage.senderId === selectedUser._id;

            // If incoming message isn't from the chat we're viewing, ignore it
            if (!isMessageFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    /**
     * unSubscribeFromMessages()
     * --------------------------
     * Removes the `"newMessage"` listener when:
     * - Component unmounts
     * - User switches chats
     *
     * Prevents duplicate event listeners and memory leaks.
     */
    unSubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    /**
     * setSelectedUser()
     * ------------------
     * Updates the selected chat user.
     */
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
