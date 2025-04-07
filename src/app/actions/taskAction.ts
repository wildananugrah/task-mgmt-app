'use server';

import { revalidatePath } from 'next/cache';
import { getAuthSession } from '../lib/auth';
import { createTask, getAllTasks } from '../lib/tasks';

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
        return getAllTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}
