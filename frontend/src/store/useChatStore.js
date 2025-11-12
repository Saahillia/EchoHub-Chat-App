import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

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

    getMessages: async (user) => {
    if (!user || !user._id) {
        console.log(" No valid user to fetch messages for.");
        return;
    }        
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
    
    sendMessages : async(messageData) => {
        const { selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages:[...messages, res.data]});
        } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    subscribeToMessages: () =>{
        const { selectedUser } = get()
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) =>{
            const isMessageSelectedFromSelectedUser = newMessage.senderId === selectedUser._id;
            if(!isMessageSelectedFromSelectedUser) return;
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },
    unSubscribeFromMessages: () =>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    // todo:optimizse this one later
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
