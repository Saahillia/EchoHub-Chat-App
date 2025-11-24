import { create } from "zustand";

/**
 * Zustand Store: Theme Management
 * --------------------------------
 * This store handles the user's UI theme preference.
 *
 * - Themes are persisted in localStorage so the user’s chosen theme
 *   remains active even after refreshing or reopening the browser.
 * - Zustand provides global state so any component can access or update the theme.
 */
export const useThemeStore = create((set) => ({

    /** 
     * Current active theme
     * ----------------------
     * Loads saved theme from localStorage if available.
     * Defaults to `"coffee"` (DaisyUI theme) if none is stored.
     */
    theme: localStorage.getItem("chat-theme") || "coffee",

    /**
     * setTheme(theme)
     * ----------------
     * Updates the theme globally AND saves it to localStorage.
     * This ensures:
     * - Instant theme switch across the app
     * - Persistent theme across sessions
     */
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    },
}));
