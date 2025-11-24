import { Link } from "react-router-dom";                                    // Router link component for navigation
import { LogOut, Settings, Activity, User, MessageCircle } from "lucide-react";     // Icon set from lucide-react
import { useAuthStore } from "../store/useAuthStore";               // Auth store hook containing logout() and authenticated user info

// ======================================================================
// Navbar Component
// Purpose:
// - Displays top navigation bar for the entire app
// - Shows app logo + name + activity pulse animation
// - Provides quick access to settings, profile, and logout
// - Sticky at the top with blurred background for modern UI
// ======================================================================
const Navbar = () => {
    const { logout, authUser } = useAuthStore(); // Extract auth state + logout action

    return (
        <header
            className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40
            backdrop-blur-lg bg-base-100/80" // sticky glass-like navbar
        >
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">

                    {/* ================= LEFT SIDE (Logo + Brand Name) ================= */}
                    <div className="flex items-center gap-8">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
                        >
                            {/* App Logo */}
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-primary" />
                            </div>

                            {/* App Name */}
                            <h1 className="text-lg font-bold">EchoHub</h1>

                            {/* Activity pulse to indicate live chatting functionality */}
                            <Activity className="w-5 h-5 text-primary animate-pulse" />
                        </Link>
                    </div>

                    {/* ================= RIGHT SIDE (Settings, Profile, Logout) ================= */}
                    <div className="flex items-center gap-2">

                        {/* Settings button */}
                        <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
                            <Settings className="w-4 h-4" />
                            <span className="hidden sm:inline">Settings</span>
                        </Link>

                        {/* These options only show when user is logged in */}
                        {authUser && (
                            <>
                                {/* Profile button */}
                                <Link to="/profile" className="btn btn-sm gap-2">
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>

                                {/* Logout button */}
                                <button
                                    className="flex gap-2 items-center btn btn-sm transition-colors"
                                    onClick={logout}
                                >
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
