'use client';

import { signIn } from "next-auth/react";

export default function Home() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
          Log in or join Task Manager
        </h1>
        <div className="space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
