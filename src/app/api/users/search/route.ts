// src/app/api/users/search/route.ts
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';

    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
            take: 10,
        });

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'User search failed' }, { status: 500 });
    }
}
