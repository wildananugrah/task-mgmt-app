'use client';

import { Session } from "next-auth";
import Image from "next/image";
import { NavItem } from "./NavItem";
import { TaskItem } from "./TaskItem";
import { useState } from "react";
import ModalComponent from "@/components/ModalComponent";
import TestNotificationComponent from "./TestNotificationButtons";
import SlidedInDrawerComponent from "@/components/SlidedInDrawerComponent";
import TestSlideInDrawerButtons from "./TestSlideInDrawerButtons";
import { signOut } from "next-auth/react";

export default function ClientDashboard(props: { session: Session }) {
  const [showModal, setShowModal] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openSubRight, setOpenSubRight] = useState(false);

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex">
      {/* Sidebar */}
      <aside className="flex flex-col justify-between h-full w-64 bg-white dark:bg-gray-800 p-6 rounded-r-2xl shadow-md hidden md:flex">
        {/* TOP PART */}
        <div>
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <Image
                src="https://i.pravatar.cc/40"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-semibold text-lg">Stereo AI</span>
            </div>
          </div>

          <nav className="space-y-4">
            <NavItem icon="💻" label="Inbox" active />
            <NavItem icon="✅" label="My issues" />
            <NavItem icon="📚" label="Views" />
            <NavItem icon="🗺️" label="Roadmaps" />
            <NavItem icon="⭐" label="Favorites" />
          </nav>
        </div>

        {/* BOTTOM PART (Logout) */}
        <div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition w-full"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Inbox</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tasks and teams"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm outline-none"
          />
        </div>

        <div className="space-y-3">
          <TaskItem
            title="Create new user onboarding flow"
            date="Oct 12, 2022"
          />
          <TaskItem
            title="Integrate with Google Analytics"
            date="Oct 14, 2022"
          />
          <TaskItem
            title="Improve error handling in API"
            date="Oct 16, 2022"
          />
        </div>

        <div className="mt-8">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={(e: any) => setShowModal(!showModal)}
          >
            Create task
          </button>
        </div>
      </main>
      <ModalComponent isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-2">This is a modal</h2>
        <p className="text-gray-600 mb-4">It's responsive and animated!</p>
        <TestNotificationComponent />
        <TestSlideInDrawerButtons setOpenRight={setOpenRight} />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
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
    </div>
  );
}


