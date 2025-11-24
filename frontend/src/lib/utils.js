/**
 * formatMessageTime()
 * -------------------
 * Purpose:
 * - Converts a message timestamp into a human-readable time format.
 * - Used in chat bubbles to display “12:45 PM”, etc.
 *
 * How it works:
 * - Takes a date string (ISO timestamp from backend)
 * - Converts it into a JavaScript Date object
 * - Formats it based on U.S. locale rules:
 *      - hour: 2 digits (e.g., "09", "12")
 *      - minute: 2 digits
 *      - hour12: true → returns AM/PM format
 */
export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}
