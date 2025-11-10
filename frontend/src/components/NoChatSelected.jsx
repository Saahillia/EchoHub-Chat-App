import { MessageCircle, Sparkles, Send } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 relative overflow-hidden">
        {/* Floating bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-150"></div>
        </div>

        <div className="max-w-md text-center space-y-6 relative z-10">
            {/* Icon with glow & sparkles */}
            <div className="flex justify-center mb-4">
            <div className="relative group">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-10 h-10 text-primary animate-pulse" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-primary animate-ping" />
            </div>
            </div>

            {/* Welcome text */}
            <h2 className="text-3xl font-bold text-base-content">
            Welcome to <span className="text-primary">EchoHub</span>
            </h2>
            <p className="text-base-content/70 text-lg">
            Select a chat to start messaging and experience seamless communication.
            </p>

            {/* Decorative mini chat bubbles */}
            <div className="mt-10 flex justify-center gap-3 text-sm text-base-content/70">
            <div className="px-4 py-2 rounded-2xl bg-base-200 shadow-sm animate-bounce delay-100">
                “Hey there 👋”
            </div>
            <div className="px-4 py-2 rounded-2xl bg-base-200 shadow-sm animate-bounce delay-300">
                “Welcome to EchoHub!”
            </div>
            <Send className="w-4 h-4 text-primary animate-pulse ml-2" />
            </div>
        </div>
        </div>
    );
};

export default NoChatSelected;
