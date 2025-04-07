'use client';

export async function fetchTasks() {
    try {
        const response = await fetch(`/api/tasks`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies are sent with the request.
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Adjust the API endpoint as needed
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}