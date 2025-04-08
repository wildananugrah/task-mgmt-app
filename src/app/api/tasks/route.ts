import { getAuthSession } from '@/app/lib/auth';
import { createTask, getAllTasks } from '@/app/lib/tasks';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  const body = await req.json();

  try {
    const session = await getAuthSession();
    if (!session) throw new Error('Unauthorized');
    // "creator": { "connect": { "id": "USER_ID_HERE" } }
    body.creator = {
      connect: { id: session?.user?.id }
    }
    const task = await createTask(body);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('POST /api/tasks error:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) throw new Error('Unauthorized');
    const tasks = await getAllTasks(session.user.id);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('GET /api/tasks error:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
