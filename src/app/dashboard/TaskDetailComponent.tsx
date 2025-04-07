'use client'

import React, { useEffect } from 'react'
import { SlideStore } from '../stores/slider.store';
import { TaskStore } from '../stores/task.store';
import { format } from 'date-fns';
import { capitalizeFirstWord } from '../helpers/common.helper';

export default function TaskDetailComponent() {
    const openDashboardSlider = SlideStore((state) => state.openDashboardSlider);
    const setOpenDashboardSlider = SlideStore((state) => state.setOpenDashboardSlider);
    const currentTask = TaskStore((state) => state.currentTask);
    useEffect(() => {
        
    }, [currentTask]);
    return !currentTask ? <p>No Data</p> :
    (
        <main className="max-w-4xl mx-auto px-4 py-10">
            <div className="text-sm text-gray-500 mb-2">
                <span className="text-blue-600 cursor-pointer hover:underline">Marketing</span> / Write blog post
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">{currentTask.title}</h1>
            <p className="text-blue-600 mb-6">Due in 3 days</p>

            <section className="mb-6">
                <h2 className="font-semibold text-lg mb-1 text-black">Description</h2>
                <p className="text-gray-700">
                    {currentTask.description}
                </p>
            </section>

            <section className="mb-6">
                <h2 className="font-semibold text-lg mb-1 text-black">Subtasks (0)</h2>
                {/* Placeholder for future subtasks */}
                <div className="text-gray-400">No subtasks yet.</div>
            </section>

            <section className="mb-6">
                <h2 className="font-semibold text-lg mb-1 text-black">Attributes</h2>
                <div className="grid grid-cols-2 gap-y-4 border-t pt-4">
                    <div>
                        <p className="text-sm text-gray-500">Due date</p>
                        <p className="text-gray-900">{format(currentTask.dueDate, "dd MMM yyyy")}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Priority</p>
                        <p className="text-gray-900">{capitalizeFirstWord(currentTask.status)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="text-gray-900">{capitalizeFirstWord(currentTask.status)}</p>
                    </div>
                </div>
            </section>

            <div className="flex justify-end space-x-4">
                <button
                    onClick={(e: any) => {
                        setOpenDashboardSlider(!openDashboardSlider);
                    }}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    Save changes
                </button>
            </div>
        </main>
    )
}
