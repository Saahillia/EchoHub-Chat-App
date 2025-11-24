// AuthImagePattern Component
// Purpose:
// - Displays a decorative animated grid + title + subtitle on the right side
//   of authentication pages (e.g., login/signup).
// - Only visible on large screens (hidden on mobile) to keep UI clean.

const AuthImagePattern = ({ title, subtitle }) => {
    return (
        // Outer container:
        // - Hidden on small screens (hidden)
// - Shown from 'lg' breakpoint upwards (lg:flex)
// - Applies a gradient background + padding
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30 p-12">
            {/* Inner content wrapper: centers and limits width */}
            <div className="max-w-md text-center">
                {/* Decorative animated grid (3x3)
                    - Creates 9 square blocks
                    - Every even index block animates with pulse
                    - Purely visual, used to enhance auth pages
                */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-2xl bg-primary/10 ${
                                i % 2 === 0 ? "animate-pulse" : ""
                            }`}
                        />
                    ))}
                </div>
                {/* Title passed as prop (e.g., “Welcome Back”) */}
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                {/* Subtitle text (e.g., “Login to continue”) */}
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div>
    );
};

export default AuthImagePattern;
