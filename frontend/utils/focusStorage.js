// Local-first storage utility for Eirene Focus Mode
// Philosophy: "Privacy First" - No Tracking, Auto-Expiration

const STORAGE_KEY = 'eirene_focus_data';
const TTL_HOURS = 48; // Time-to-Live

/**
 * Saves multi-day tasks to localStorage with a timestamp.
 * @param {Object} data - The focus data object { today: {high, medium, low}, tomorrow: {high, medium, low} }
 */
export const saveFocusData = (data) => {
    if (typeof window === 'undefined') return;

    try {
        const payload = {
            today: data.today || { high: [], medium: [], low: [] },
            tomorrow: data.tomorrow || { high: [], medium: [], low: [] },
            timestamp: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
        console.error("Failed to save focus data to local storage", error);
    }
};

/**
 * Loads tasks from localStorage.
 * Enforces TTL (silently clears if older than TTL_HOURS).
 * @returns {Object|null} The stored data or null if expired/empty
 */
export const loadFocusData = () => {
    if (typeof window === 'undefined') return null;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        const data = JSON.parse(stored);

        // Check Auto-Expiration (TTL)
        if (data.timestamp) {
            const ageInMs = Date.now() - data.timestamp;
            const ttlMs = TTL_HOURS * 60 * 60 * 1000;

            if (ageInMs > ttlMs) {
                // Silently expire data
                clearFocusData();
                return null;
            }
        }

        return data;
    } catch (error) {
        console.error("Failed to load focus data from local storage", error);
        return null; // Return null on corruption to force fresh start
    }
};

/**
 * Clears focus data from localStorage.
 */
export const clearFocusData = () => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear focus data", error);
    }
};
