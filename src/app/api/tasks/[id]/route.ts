import { getAuthSession } from '@/app/lib/auth';
import { getTaskById, updateTask, deleteTask } from '@/app/lib/tasks';
import { NextResponse } from 'next/server';

interface Params {
    params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
    try {
        const session = await getAuthSession();
        if (!session) throw new Error('Unauthorized');
        const task = await getTaskById(params.id);
        if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        return NextResponse.json(task);
    } catch (error) {
        console.error('GET /api/tasks/[id] error:', error);
        return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: Params) {
    const data = await req.json();

    try {
        const session = await getAuthSession();
        if (!session) throw new Error('Unauthorized');

        const task = await updateTask(params.id, data);
        return NextResponse.json(task);
    } catch (error) {
        console.error('PUT /api/tasks/[id] error:', error);
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const session = await getAuthSession();
        if (!session) throw new Error('Unauthorized');
        
        await deleteTask(params.id);
        return NextResponse.json({ message: 'Task deleted' });
    } catch (error) {
        console.error('DELETE /api/tasks/[id] error:', error);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
