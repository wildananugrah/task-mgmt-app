
import { getAuthSession } from "@/app/lib/auth";
import { createProject } from "@/app/lib/projects";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();

    try {
        const session = await getAuthSession();
        if (!session) throw new Error('Unauthorized');

        const project = await createProject(data, session.user.id);
        if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

        return NextResponse.json(project);
    } catch (error) {
        console.error('GET /api/projects/[id] error:', error);
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
}