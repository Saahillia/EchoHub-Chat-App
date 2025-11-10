import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

const HomePage = () => {
    const {selectedUser} = useChatStore();

    return(
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-2 sm:px-4">
                <div className="bg-base-100 shadow-xl rounded-lg w-full max-w-7xl h-[calc(100vh-7rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar/>

                        {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}

                    </div>
                </div>
            </div>
        </div>

    );
};
export default HomePage;