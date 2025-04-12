'use server';

import { revalidatePath } from 'next/cache';
import { authOptions, getAuthSession } from '../lib/auth';
import { createTask, getAllTasks } from '../lib/tasks';
import { getServerSession } from 'next-auth';
import { Prisma } from '@prisma/client';

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
    const projectId = formData.get('projectId') as string;
    const taskId = formData.get('taskId') as string;

    try {
        let data: Prisma.TaskCreateInput = {
            title,
            description,
            priority,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            creator: {
                connect: { id: session?.user?.id },
            },
            project: {
                connect: { id: projectId }
            },
        };
        if (taskId !== null)
            data.parentTask = {
                connect: { id: taskId }
            }
        await createTask(data);
        revalidatePath('/dashboard/tasks');
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
