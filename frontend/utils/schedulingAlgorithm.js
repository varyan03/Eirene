/**
 * Eirene Scheduling Algorithm (Tiered Allocation)
 * Philosophy: "Productivity without Guilt"
 */

// 1. Flatten & Sort
const flattenAndSort = (high, medium, low) => {
    // Helper to sort a priority tier by rank (or creation order if no rank)
    const sortByRank = (a, b) => {
        if (a.rank && b.rank) return a.rank - b.rank;
        if (a.rank) return -1;
        if (b.rank) return 1;
        // Fallback to creation order (assuming they keep array order if unranked)
        return 0;
    };

    const sortedHigh = [...high].sort(sortByRank).map(t => ({ ...t, tier: 'high' }));
    const sortedMedium = [...medium].sort(sortByRank).map(t => ({ ...t, tier: 'medium' }));
    const sortedLow = [...low].sort(sortByRank).map(t => ({ ...t, tier: 'low' }));

    return [...sortedHigh, ...sortedMedium, ...sortedLow];
};

// 2. Determine Anchor Time
const determineAnchorTime = (dateSelection, nowMs = Date.now()) => {
    if (dateSelection === 'Tomorrow') {
        const anchor = new Date(nowMs);
        anchor.setDate(anchor.getDate() + 1);
        anchor.setHours(9, 0, 0, 0); // Default gentle morning start: 9:00 AM
        return anchor;
    } else {
        // Today
        const anchor = new Date(nowMs);
        const minutes = anchor.getMinutes();
        const remainder = minutes % 30;

        if (remainder === 0) {
            // Already on a 30-min mark, use exact time (optional: maybe want to force Next 30 anyway? Spec says round up)
            // If it's exactly 4:00, start at 4:00. If 4:01, start at 4:30.
            return anchor;
        }

        // Round up to nearest 30 mins
        anchor.setMinutes(minutes + (30 - remainder), 0, 0);
        return anchor;
    }
};

// 3. Generate Blocks & Enforce Capacity Limits
export const generateSchedule = (focusData, nowMs = Date.now()) => {
    const { dateToggle = 'Today', high = [], medium = [], low = [] } = focusData;

    // Master queue
    const masterQueue = flattenAndSort(high, medium, low);

    // Calculate start time
    let currentTime = determineAnchorTime(dateToggle, nowMs);

    const schedule = [];
    const MAX_CAPACITY = 10;

    // Check late night boundary (e.g. going past midnight on 'Today')
    let crossedMidnight = false;

    for (let i = 0; i < Math.min(masterQueue.length, MAX_CAPACITY); i++) {
        const task = masterQueue[i];

        const startTime = new Date(currentTime);
        const endTime = new Date(currentTime);
        endTime.setHours(endTime.getHours() + 1); // Sequential 60-minute block

        // Detect if we crossed midnight on a "Today" schedule (simple check based on date change)
        if (dateToggle === 'Today' && i > 0 && endTime.getDate() !== startTime.getDate()) {
            crossedMidnight = true;
        }

        schedule.push({
            ...task,
            startTime,
            endTime,
            blockLabel: `${formatTimeAMPM(startTime)} - ${formatTimeAMPM(endTime)}`
        });

        currentTime = endTime;
    }

    const isOverCapacity = masterQueue.length > MAX_CAPACITY;

    let message = null;
    if (isOverCapacity) {
        message = "You've planned a full day. Doing 20% is still success.";
    } else if (crossedMidnight) {
        message = "Your schedule extends past midnight. Consider saving some tasks for tomorrow.";
    } else if (schedule.length > 0) {
        message = "Your curated timeline is ready.";
    }

    return {
        schedule,
        totalTasks: masterQueue.length,
        isOverCapacity,
        hasLateNightWarning: crossedMidnight,
        message
    };
};

/**
 * Formats a Date object to "h:mm A" format (e.g., "9:30 AM")
 */
export const formatTimeAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
};
