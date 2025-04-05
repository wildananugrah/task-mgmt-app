import { protectRequest } from '@/app/lib/auth';

export async function GET() {
  const session = await protectRequest();
  if (session instanceof Response) return session;

  return Response.json({ message: `Hello ${session.user?.email}` });
}
