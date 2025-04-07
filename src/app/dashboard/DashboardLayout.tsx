'use client';

import { Session } from "next-auth";
import Image from "next/image";
import { NavItem } from "./NavItem";
import { signOut } from "next-auth/react";

export default function DashboardLayout(props: { session: Session, children: any }) {
  const { session, children } = props;

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex">
      {/* Sidebar */}
      <aside className="flex flex-col justify-between h-full w-64 bg-white dark:bg-gray-800 p-6 rounded-r-2xl shadow-md hidden md:flex">
        {/* TOP PART */}
        <div>
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <Image
                src={session.user?.image ?? "https://i.pravatar.cc/40?u=default"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-semibold text-lg">{session.user?.name}</span>
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
        {children}
      </main>
    </div>
  );
}


