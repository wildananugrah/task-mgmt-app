'use client';

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import ModalComponent from "@/components/ModalComponent";
import SlidedInDrawerComponent from "@/components/SlidedInDrawerComponent";
import CreateTaskFormComponent from "./CreateTaskFormComponent";
import DashboardLayout from "./DashboardLayout";
import TaskListComponent from "./TaskListComponent";
import { TaskStore } from "../stores/task.store";
import { SlideStore } from "../stores/slider.store";
import TaskDetailComponent from "./TaskDetailComponent";

export default function ClientDashboardComponent(props: { session: Session, tasks: any }) {
  const { session, tasks } = props;
  const [showModal, setShowModal] = useState(false);
  const openDashboardSlider = SlideStore((state) => state.openDashboardSlider);
  const setOpenDashboardSlider = SlideStore((state) => state.setOpenDashboardSlider);
  const setTasks = TaskStore((state) => state.setTasks);
  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);
  return (
    <>
      <DashboardLayout session={session}>
        <h1 className="text-2xl font-semibold mb-4">Inbox</h1>

        <div className="mb-6">
          <input
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


