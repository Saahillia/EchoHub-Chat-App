// Zustand chat store — used here to check if a user is selected
import { useChatStore } from "../store/useChatStore";

// Sidebar with user list
import Sidebar from "../components/Sidebar.jsx";

// Shown when no chat is selected (beautiful welcome state)
import NoChatSelected from "../components/NoChatSelected.jsx";

// Full chat view when a user is selected
import ChatContainer from "../components/ChatContainer.jsx";


// ======================================================================
// HomePage Component
// Purpose:
// - Main layout for chat application after login
// - Contains Sidebar (left) and Chat Area (right)
// - If no user is selected → shows friendly placeholder screen
// ======================================================================
const HomePage = () => {
    const { selectedUser } = useChatStore(); // check if a user is chosen from sidebar

    return (
        // Full-screen background for consistent app appearance
        <div className="h-screen bg-base-200">

            {/* Centered main container with top padding (padded under navbar) */}
            <div className="flex items-center justify-center pt-20 px-2 sm:px-4">

                {/* Main chat card container */}
                <div className="bg-base-100 shadow-xl rounded-lg w-full max-w-7xl h-[calc(100vh-7rem)]">
                    
                    {/* Layout wrapper for Sidebar + Chat Section */}
                    <div className="flex h-full rounded-lg overflow-hidden">

                        {/* Sidebar containing list of contacts */}
                        <Sidebar />

                        {/* Conditional Rendering:
                        - If no user is selected → show welcome screen
                        - If user is selected → show actual chat UI */}
                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
