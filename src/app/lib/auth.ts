// lib/auth.ts
import { authOptions as NextAuthOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const authOptions = NextAuthOptions;
export const getAuthSession = () => getServerSession(authOptions);
export async function protectRequest() {
    const session = await getAuthSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return session;
}

