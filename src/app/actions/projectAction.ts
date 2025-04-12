'use server';

import { authOptions} from '../lib/auth';
import { getServerSession } from 'next-auth';
import { getAllProjects } from '../lib/projects';

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
