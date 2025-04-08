import { differenceInCalendarDays } from "date-fns";

export function capitalizeFirstWord(str: string) {
    return str.replace(/^\s*\w/, (c) => c.toUpperCase());
}

// Utility to format time in mm:ss
export const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export function convertToSeconds(time: string): number {
    const [minutes, seconds] = time.split(":").map(Number); // Split and convert to numbers
    return minutes * 60 + seconds; // Calculate total seconds
}

export const getFullURL = () => {
    return window.location.origin; // Example: "http://localhost:3000" or "https://example.com"
};

export const getCurrentURL = () => {
    return window.location.href; // Example: "http://localhost:3000/path?query=123"
};

export function countPercentageSubTaskProgress(closedCount: any, reviewCount: any): number {
    return parseFloat(closedCount) === 0 ? 0 :
        parseFloat(((parseFloat(closedCount) / (parseFloat(closedCount) + parseFloat(reviewCount))) * 100).toFixed(2));
}

export function getRemainingDays(dueDate: string): string {
    const today = new Date()
    const due = new Date(dueDate)
    const days = differenceInCalendarDays(due, today)

    if (days < 0) return 'Overdue'
    if (days === 0) return 'Due today'
    if (days === 1) return 'Due tomorrow'
    return `Due in ${days} days`
}
