// Icons from lucide-react used for decorative UI elements
import { MessageCircle, Sparkles, Send } from "lucide-react";


// ======================================================================
// NoChatSelected Component
// Purpose:
// - Shown when no user/chat is selected on the right side of the UI
// - Displays a welcoming message and decorative animations
// - Makes the empty state of the chat visually appealing and informative
// ======================================================================
const NoChatSelected = () => {
    return (
        // Main container
        // - Centers content vertically + horizontally
        // - Light blurred background design
        // - Overflow hidden for floating bubble effects
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 relative overflow-hidden">

            {/* Floating decorative bubbles in background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-150"></div>
            </div>

            {/* Foreground content (kept above bubbles using z-index) */}
            <div className="max-w-md text-center space-y-6 relative z-10">

                {/* Central icon with glow and sparkle animation */}
                <div className="flex justify-center mb-4">
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                            <MessageCircle className="w-10 h-10 text-primary animate-pulse" />
                        </div>

                        {/* Sparkle overlay animation */}
                        <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-primary animate-ping" />
                    </div>
                </div>

                {/* Welcome Heading */}
                <h2 className="text-3xl font-bold text-base-content">
                    Welcome to <span className="text-primary">EchoHub</span>
                </h2>

                {/* Subtext description */}
                <p className="text-base-content/70 text-lg">
                    Select a chat to start messaging and experience seamless communication.
                </p>

                {/* Small decorative chat bubbles at bottom */}
                <div className="mt-10 flex justify-center gap-3 text-sm text-base-content/70">
                    <div className="px-4 py-2 rounded-2xl bg-base-200 shadow-sm animate-bounce delay-100">
                        “Hey there 👋”
                    </div>

                    <div className="px-4 py-2 rounded-2xl bg-base-200 shadow-sm animate-bounce delay-300">
                        “Welcome to EchoHub!”
                    </div>

                    {/* Send icon */}
                    <Send className="w-4 h-4 text-primary animate-pulse ml-2" />
                </div>
            </div>
        </div>
    );
};

export default NoChatSelected;
