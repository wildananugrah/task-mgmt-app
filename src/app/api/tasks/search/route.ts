import { getAuthSession } from '@/app/lib/auth';
import { searchTasksFullText } from '@/app/lib/tasks';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';

    try {
        console.log(query);
        const session = await getAuthSession();
        if (!session) throw new Error('Unauthorized');
        const tasks = await searchTasksFullText(session.user.id, query);
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json({ error: 'User search failed' }, { status: 500 });
    }
}
