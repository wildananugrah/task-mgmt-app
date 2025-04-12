'use client';

export async function createProject(data: any) {
    try {
        const response = await fetch(`/api/projects`, {
            method: 'POST',
            credentials: 'include', // Ensure cookies are sent with the request.
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Adjust the API endpoint as needed
        if (!response.ok) {
            throw new Error('Failed to fetch project');
        }
        const tasks = await response.json();
        return tasks;
    } catch (error: any) {
        console.error(error);
    }
}

export async function fetchProjectDetail(id: string) {
    try {
        const response = await fetch(`/api/projects/${id}`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies are sent with the request.
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Adjust the API endpoint as needed
        if (!response.ok) {
            throw new Error('Failed to fetch project');
        }
        const tasks = await response.json();
        return tasks;
    } catch (error: any) {
        console.error(error);
    }
}

export async function fetchProjectsSearch(search: string) {
    try {
        const response = await fetch(`/api/projects/search?q=${search}`, {
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

export async function updateProjectDetail(id: string, data: any) {
    try {
        const response = await fetch(`/api/projects/${id}`, {
            method: 'PUT',
            credentials: 'include', // Ensure cookies are sent with the request.
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Adjust the API endpoint as needed
        if (!response.ok) {
            throw new Error('Failed to fetch project');
        }
        const tasks = await response.json();
        return tasks;
    } catch (error: any) {
        console.error(error);
    }
}

export async function deleteProject(id: string) {
    try {
        const response = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            credentials: 'include', // Ensure cookies are sent with the request.
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Adjust the API endpoint as needed
        if (!response.ok) {
            throw new Error('Failed to fetch project');
        }
        const tasks = await response.json();
        return tasks;
    } catch (error: any) {
        console.error(error);
    }
}