'use client'

import React, { useEffect, useState } from 'react'
import { useNotification } from '@/components/NotificationProviderComponent'
import { formatDate } from 'date-fns'
import ModalComponent from '@/components/ModalComponent'
import { SlideStore } from '@/app/stores/slider.store'
import { TaskStore } from '@/app/stores/task.store'
import { capitalizeFirstWord, getRemainingDays } from '@/app/helpers/common.helper'
import { updateTaskDetail } from '@/app/actions/logics/tasks'
import DeleteTaskConfirmationComponent from './DeleteTaskConfirmationComponent'

export default function TaskDetailComponent() {
    const openDashboardSlider = SlideStore((state) => state.openDashboardSlider)
    const setOpenDashboardSlider = SlideStore((state) => state.setOpenDashboardSlider)
    const currentTask = TaskStore((state) => state.currentTask);
    const { notify } = useNotification();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        status: '',
        projectName: ''
    })

    const [editingField, setEditingField] = useState<string | null>(null);

    useEffect(() => {
        if (currentTask) {
            setTaskData({
                title: currentTask.title,
                description: currentTask.description,
                dueDate: currentTask.dueDate.slice(0, 10), // for input type="date"
                priority: currentTask.priority || 'normal',
                status: currentTask.status,
                projectName: currentTask.project?.name || ''
            })
        }
    }, [currentTask])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setTaskData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    if (!currentTask) return <p>No Data</p>

    return (
        <main className="max-w-4xl mx-auto px-4 py-10">

            <div className="mb-2">
                {editingField === 'title' ? (
                    <div className='flex flex-col space-y-2'>
                        <input
                            name="title"
                            value={taskData.title}
                            onChange={handleChange}
                            onBlur={() => setEditingField(null)}
                            autoFocus
                            className="text-4xl font-bold text-gray-900 w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                        />
                        <p className='text-gray-500'>{taskData.projectName}</p>
                    </div>
                ) : (
                    <div className='flex flex-col space-y-2'>
                        <h1
                            className="text-4xl font-bold text-gray-900 cursor-pointer"
                            onClick={() => setEditingField('title')}
                        >
                            {taskData.title}
                        </h1>
                        <p className='text-gray-500'>{taskData.projectName}</p>
                    </div>
                )}
            </div>

            <p className="text-blue-600 mb-6">{getRemainingDays(currentTask.dueDate)}</p>

            <section className="mb-6">
                <h2 className="font-semibold text-lg mb-1 text-black">Description</h2>
                {editingField === 'description' ? (
                    <textarea
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        onBlur={() => setEditingField(null)}
                        rows={4}
                        autoFocus
                        className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
                    />
                ) : (
                    <p
                        className="text-gray-700 cursor-pointer"
                        onClick={() => setEditingField('description')}
                    >
                        {taskData.description || 'Click to add a description...'}
                    </p>
                )}
            </section>

            <section className="mb-6">
                <h2 className="font-semibold text-lg mb-1 text-black">Subtasks (0)</h2>
                <div className="text-gray-400">No subtasks yet. <span className='hover:underline cursor-pointer text-gray-400' onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}> Create a sub task ?</span></div>
            </section>

            <section className="mb-6">
                <h2 className="font-semibold text-lg mb-1 text-black">Attributes</h2>
                <div className="grid grid-cols-2 gap-y-4 gap-x-4 border-t pt-4">
                    <div>
                        <p className="text-sm text-gray-500">Due date</p>
                        {editingField === 'dueDate' ? (
                            <input
                                type="date"
                                name="dueDate"
                                value={taskData.dueDate}
                                onChange={handleChange}
                                onBlur={() => setEditingField(null)}
                                autoFocus
                                className="text-gray-900 border border-gray-300 rounded-lg p-2 w-full"
                            />
                        ) : (
                            <p
                                className="text-gray-900 cursor-pointer"
                                onClick={() => setEditingField('dueDate')}
                            >
                                {taskData.dueDate !== '' && formatDate(taskData.dueDate, "dd MMM yyyy")}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Priority</p>
                        {editingField === 'priority' ? (
                            <select
                                name="priority"
                                value={taskData.priority}
                                onChange={handleChange}
                                onBlur={() => setEditingField(null)}
                                autoFocus
                                className="text-gray-900 border border-gray-300 rounded-lg p-2 w-full"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        ) : (
                            <p
                                className="text-gray-900 cursor-pointer"
                                onClick={() => setEditingField('priority')}
                            >
                                {capitalizeFirstWord(taskData.priority.toLocaleLowerCase())}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Status</p>
                        {editingField === 'status' ? (
                            <select
                                name="status"
                                value={taskData.status}
                                onChange={handleChange}
                                onBlur={() => setEditingField(null)}
                                autoFocus
                                className="text-gray-900 border border-gray-300 rounded-lg p-2 w-full"
                            >
                                <option value="todo">To Do</option>
                                <option value="pending">Pending</option>
                                <option value="done">Done</option>
                            </select>
                        ) : (
                            <p
                                className="text-gray-900 cursor-pointer"
                                onClick={() => setEditingField('status')}
                            >
                                {capitalizeFirstWord(taskData.status.toLocaleLowerCase())}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <div className="flex justify-end space-x-4">
                <button
                    onClick={() => setOpenDashboardSlider(!openDashboardSlider)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                >
                    Delete
                </button>
                <button
                    onClick={async () => {
                        taskData.dueDate = new Date(taskData.dueDate).toISOString();
                        try {
                            await updateTaskDetail(currentTask.id, taskData);
                            notify('Task updated successfully!', { type: 'success' });
                        } catch (error: any) {
                            console.error(error);
                            notify('Task updated action error!', { type: 'error' });
                        }
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    Save changes
                </button>
            </div>
            <ModalComponent isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
                <DeleteTaskConfirmationComponent 
                    setShowDeleteConfirm={setShowDeleteConfirm} 
                    showDeleteConfirm={showDeleteConfirm} 
                    taskData={taskData}
                    setTaskData={setTaskData}
                />
            </ModalComponent>
        </main>
    )
}
