'use client';

import { Session } from "next-auth";
import { useState } from "react";
import ModalComponent from "@/components/ModalComponent";
import SlidedInDrawerComponent from "@/components/SlidedInDrawerComponent";
import CreateTaskFormComponent from "./CreateTaskFormComponent";
import DashboardLayout from "./DashboardLayout";
import TaskListComponent from "./TaskListComponent";

export default function ClientDashboard(props: { session: Session }) {
  const { session } = props;
  const [showModal, setShowModal] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openSubRight, setOpenSubRight] = useState(false);

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
      <SlidedInDrawerComponent isOpen={openRight} onClose={() => setOpenRight(false)} from="right">
        <h2 className="text-xl font-bold mb-4">Right Drawer</h2>
        <p>This slides in from the right!</p>
        <button
          onClick={() => setOpenSubRight(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        >
          Open Right Drawer
        </button>
        <SlidedInDrawerComponent isOpen={openSubRight} onClose={() => setOpenSubRight(false)} width="w-full sm:w-10/12 sm:max-w-[95vw]" from="right">
          <h2 className="text-xl font-bold mb-4">Sub Right Drawer</h2>
          <p>This sub slides in from the right!</p>
        </SlidedInDrawerComponent>
      </SlidedInDrawerComponent>
    </>
  );
}


