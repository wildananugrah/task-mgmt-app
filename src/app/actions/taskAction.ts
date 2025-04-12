'use server';

import { authOptions } from '../lib/auth';
import { getAllTasks } from '../lib/tasks';
import { getServerSession } from 'next-auth';

export async function fetchAllTasks() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            throw new Error('User not authenticated')
        }
        return getAllTasks(session?.user?.id);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}
