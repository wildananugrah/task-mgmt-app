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

export async function fetchTaskDetail(id: string) {
    try {
        const response = await fetch(`/api/tasks/${id}`, {
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
    } catch (error: any) {
        console.error(error);
    }
}

export async function updateTaskDetail(id: string, data: any){
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            credentials: 'include', // Ensure cookies are sent with the request.
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Adjust the API endpoint as needed
        if (!response.ok) {
            throw new Error('Failed to updated tasks');
        }
        const tasks = await response.json();
        return tasks;
    } catch (error: any) {
        console.error(error);
    }
}

export async function deleteTask(id: string){
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            credentials: 'include', // Ensure cookies are sent with the request.
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Adjust the API endpoint as needed
        if (!response.ok) {
            throw new Error('Failed to updated tasks');
        }
        const tasks = await response.json();
        return tasks;
    } catch (error: any) {
        console.error(error);
    }
}

export async function fetchParentChainTask(id: string) {
    try {
        const response = await fetch(`/api/tasks/${id}/parents`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies are sent with the request.
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Adjust the API endpoint as needed
        if (!response.ok) {
            throw new Error('Failed to updated tasks');
        }
        const tasks = await response.json();
        return tasks;
    } catch (error: any) {
        console.error(error);
    }
}

export async function fetchLevelOneSubtask(id: string) {
    try {
        const response = await fetch(`/api/tasks/${id}/levelone`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies are sent with the request.
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Adjust the API endpoint as needed
        if (!response.ok) {
            throw new Error('Failed to updated tasks');
        }
        const tasks = await response.json();
        return tasks;
    } catch (error: any) {
        console.error(error);
    }
}