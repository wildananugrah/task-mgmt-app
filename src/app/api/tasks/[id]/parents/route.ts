import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/app/lib/auth';
import { getTaskParentChain } from '@/app/lib/tasks';

// context must NOT be explicitly typed with a custom type/interface
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    const session = await getAuthSession();
    if (!session) throw new Error('Unauthorized');

    const task = await getTaskParentChain(id);
    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

    return NextResponse.json(task);
  } catch (error) {
    console.error('GET /api/tasks/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}
