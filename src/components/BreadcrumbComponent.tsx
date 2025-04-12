'use client';

import React from 'react';

type TaskBreadcrumbItem = {
    id: string;
    title: string;
    parentTaskId: string | null;
};

type Props = {
    tasks: TaskBreadcrumbItem[];
    onClick?: (taskId: string) => void; // optional handler
};

export default function BreadcrumbComponent({ tasks, onClick }: Props) {
    const orderedTasks = [...tasks].reverse(); // root -> current

    return (
        <nav className="text-sm text-gray-700">
            <ol className="flex space-x-1 items-center">
                {orderedTasks.map((task, index) => (
                    <li key={task.id} className="flex items-center">
                        <button
                            onClick={() => onClick?.(task.id)}
                            className="hover:underline focus:outline-none cursor-pointer"
                        >
                            {task.title}
                        </button>
                        {index < orderedTasks.length - 1 && (
                            <span className="mx-1 text-gray-400">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
