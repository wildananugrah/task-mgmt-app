// app/dashboard/page.tsx (default Server Component — NO "use client")

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import ClientDashboardComponent from "./ClientDashboardComponent";
import { fetchAllTasks } from "../actions/taskAction";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const tasks = await fetchAllTasks();
  if (!session) {
    redirect("/");
  }

  return <ClientDashboardComponent session={session} tasks={tasks} />;
}
