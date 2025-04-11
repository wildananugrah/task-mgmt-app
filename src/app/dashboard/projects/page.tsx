// app/dashboard/tasks/page.tsx (default Server Component — NO "use client")

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientProjectComponent from "./ClientProjectComponent";
import { authOptions } from "@/app/lib/auth";
import { getAllProjects } from "@/app/lib/projects";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }
    const projects = await getAllProjects(session?.user.id);

    return <ClientProjectComponent session={session} projects={projects} />;
}