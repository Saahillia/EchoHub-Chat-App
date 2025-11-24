// MessageSkeleton Component
// Purpose:
// - Displays placeholder UI while messages are loading
// - Mimics the structure of chat bubbles so layout doesn't jump
// - Helps provide a smooth loading experience using skeleton blocks
const MessageSkeleton = () => {

    // Create an array of 6 skeleton items
    // Each entry represents one fake "loading message"
    const skeletonMessages = Array(6).fill(null);

    return (
        // Scrollable message area with spacing between items
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {/* Loop over each placeholder message */}
            {skeletonMessages.map((_, idx) => (
                // Alternate between left (chat-start) and right (chat-end)
                <div
                    key={idx}
                    className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
                >

                    {/* Avatar placeholder */}
                    <div className="chat-image avatar">
                        <div className="size-10 rounded-full">
                            <div className="skeleton w-full h-full rounded-full" />
                        </div>
                    </div>

                    {/* Timestamp placeholder */}
                    <div className="chat-header mb-1">
                        <div className="skeleton h-4 w-16" />
                    </div>

                    {/* Message bubble placeholder */}
                    <div className="chat-bubble bg-transparent p-0">
                        <div className="skeleton h-16 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSkeleton;
