// app/dashboard/page.tsx (default Server Component — NO "use client")

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import ClientDashboard from "./ClientDashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <ClientDashboard session={session} />;
}
