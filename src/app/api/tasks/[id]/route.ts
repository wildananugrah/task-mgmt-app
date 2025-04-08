import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/app/lib/auth';
import { getTaskById, updateTask, deleteTask } from '@/app/lib/tasks';

// context must NOT be explicitly typed with a custom type/interface
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    const session = await getAuthSession();
    if (!session) throw new Error('Unauthorized');

    const task = await getTaskById(id);
    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

    return NextResponse.json(task);
  } catch (error) {
    console.error('GET /api/tasks/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params;
  const data = await req.json();

  try {
    const session = await getAuthSession();
    if (!session) throw new Error('Unauthorized');

    const task = await updateTask(id, data);
    return NextResponse.json(task);
  } catch (error) {
    console.error('PUT /api/tasks/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    const session = await getAuthSession();
    if (!session) throw new Error('Unauthorized');

    await deleteTask(id);
    return NextResponse.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('DELETE /api/tasks/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
