'use client';

import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import ModalComponent from "@/components/ModalComponent";
import SlidedInDrawerComponent from "@/components/SlidedInDrawerComponent";
import CreateTaskFormComponent from "./CreateTaskFormComponent";
import TaskListComponent from "./TaskListComponent";
import TaskDetailComponent from "./TaskDetailComponent";
import { SlideStore } from "@/app/stores/slider.store";
import { TaskStore } from "@/app/stores/task.store";
import DashboardLayout from "@/components/DashboardLayout";
import { ProjectStore } from "@/app/stores/project.store";
import { fetchTasksSearch } from "@/app/actions/logics/tasks";

export default function ClientDashboardComponent(props: { session: Session, tasks: any, projects: any }) {
  const { session, tasks, projects } = props;
  const [showModal, setShowModal] = useState(false);
  const openDashboardSlider = SlideStore((state) => state.openDashboardSlider);
  const setOpenDashboardSlider = SlideStore((state) => state.setOpenDashboardSlider);
  const setTasks = TaskStore((state) => state.setTasks);
  const setProjects = ProjectStore((state) => state.setProjects);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(async () => {
      if (value.trim() === '') {
        setTasks(tasks); // Reset
      } else {
        const filteredTasks = await fetchTasksSearch(value);
        setTasks(filteredTasks);
      }
    }, 400); // 400ms debounce
  };

  useEffect(() => {
    setTasks(tasks);
    setProjects(projects);
  }, [tasks]);
  return (
    <>
      <DashboardLayout session={session}>
        <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

        <div className="mb-6">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search tasks and teams"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm outline-none"
          />
        </div>

        <div className="space-y-3">
          <TaskListComponent />
        </div>

        <div className="mt-8">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={(e: any) => setShowModal(!showModal)}
          >
            Create task
          </button>
        </div>
      </DashboardLayout>
      <ModalComponent isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">
          <CreateTaskFormComponent />
        </div>
      </ModalComponent>
      <SlidedInDrawerComponent isOpen={openDashboardSlider} onClose={() => setOpenDashboardSlider(false)} from="right">
        <TaskDetailComponent />
      </SlidedInDrawerComponent>
    </>
  );
}


