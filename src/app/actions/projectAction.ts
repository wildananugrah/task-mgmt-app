'use server';

import { revalidatePath } from 'next/cache';
import { authOptions, getAuthSession } from '../lib/auth';
import { getServerSession } from 'next-auth';
import { createProject, getAllProjects } from '../lib/projects';

export async function createProjectAction(
    prevState: any,
    formData: FormData
): Promise<{ error?: string; success?: boolean }> {
    const session = await getAuthSession();
    if (!session || !session.user?.id) {
        throw new Error('Unauthorized');
    }

    const name = formData.get('title') as string;
    const description = formData.get('description') as string;

    try {
        await createProject({
            description,
            name,
            owner: {
                connect: { id: session?.user?.id },
            },
        });
        revalidatePath('/dashboard/projects');
        return { success: true };
    } catch (err: any) {
        return { error: 'Failed to create task' };
    }

}

export async function fetchAllprojects() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            throw new Error('User not authenticated')
        }
        return getAllProjects(session?.user?.id);
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
