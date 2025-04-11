// app/dashboard/tasks/page.tsx (default Server Component — NO "use client")

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientDashboardComponent from "./ClientDashboardComponent";
import { authOptions } from "@/app/lib/auth";
import { fetchAllTasks } from "@/app/actions/taskAction";
import { fetchAllprojects } from "@/app/actions/projectAction";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const tasks = await fetchAllTasks();
  const projects = await fetchAllprojects();
  if (!session) {
    redirect("/");
  }

  return <ClientDashboardComponent session={session} tasks={tasks} projects={projects} />;
}
