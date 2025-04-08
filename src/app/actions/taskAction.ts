'use server';

import { revalidatePath } from 'next/cache';
import { authOptions, getAuthSession } from '../lib/auth';
import { createTask, getAllTasks } from '../lib/tasks';
import { getServerSession } from 'next-auth';

export async function createTaskAction(
    prevState: any,
    formData: FormData
): Promise<{ error?: string; success?: boolean }> {
    const session = await getAuthSession();
    if (!session || !session.user?.id) {
        throw new Error('Unauthorized');
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as 'LOW' | 'MEDIUM' | 'HIGH';
    const dueDate = formData.get('dueDate') as string;

    try {
        await createTask({
            title,
            description,
            priority,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            creator: {
                connect: { id: session?.user?.id },
            },
        });
        revalidatePath('/dashboard');
        return { success: true };
    } catch (err: any) {
        return { error: 'Failed to create task' };
    }

}

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
