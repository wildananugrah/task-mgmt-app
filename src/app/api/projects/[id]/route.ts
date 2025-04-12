import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/app/lib/auth';
import { createProject, deleteProject, getProjectById, updateProject } from '@/app/lib/projects';

// context must NOT be explicitly typed with a custom type/interface
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    const session = await getAuthSession();
    if (!session) throw new Error('Unauthorized');

    const project = await getProjectById(id);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    return NextResponse.json(project);
  } catch (error) {
    console.error('GET /api/projects/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params;
  const data = await req.json();

  try {
    const session = await getAuthSession();
    if (!session) throw new Error('Unauthorized');

    const project = await updateProject(id, data);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    return NextResponse.json(project);
  } catch (error) {
    console.error('GET /api/projects/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    const session = await getAuthSession();
    if (!session) throw new Error('Unauthorized');

    const project = await deleteProject(id);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    return NextResponse.json(project);
  } catch (error) {
    console.error('GET /api/projects/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}