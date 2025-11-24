import Navbar from "./components/Navbar";         // Top navigation bar (always visible for authenticated users)

// Application pages
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

// React Router components for routing and redirection
import { Routes, Route, Navigate } from "react-router-dom";

// Zustand stores for authentication and theme management
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";

// Runs authentication check on app load
import { useEffect } from "react";

// Loading icon & toast notifications
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";


// ============================================================================
// App Component
// Purpose:
// - Serves as the main entry point of the frontend
// - Handles routing, authentication guards, theme switching, and global layout
// ============================================================================
const App = () => {

  // Extracts authentication state and helper functions from zustand store
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  // Current global theme selected by the user
  const { theme } = useThemeStore();

  console.log({ onlineUsers }); // Debug: show users currently online

  // ==============================================================================
  // On initial page load, validate JWT by calling backend → sets authUser accordingly
  // ==============================================================================
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser); // Debug: view authenticated user info

  // ==============================================================================
  // While verifying authentication AND no user is logged in:
  // Show a full-screen loading spinner to prevent UI flicker
  // ==============================================================================
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  // ============================================================================
  // Once authentication is checked, render the application
  // Wrapping top-level div with data-theme enables DaisyUI theme switching
  // ============================================================================
  return (
    <div data-theme={theme}>
      <Navbar />

      {/* Application Routes */}
      <Routes>

        {/* Protected: Home page (only visible if authenticated) */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Public: Signup page (redirect to home if already logged in) */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />

        {/* Public: Login page (redirect to home if already logged in) */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* Public: Settings page (does not require auth) */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Protected: Profile page (requires authentication) */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      {/* Global toast notifications (for success/error alerts) */}
      <Toaster />
    </div>
  );
};

export default App;
