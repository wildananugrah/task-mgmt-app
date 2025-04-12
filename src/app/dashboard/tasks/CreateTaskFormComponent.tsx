'use client';

import { useNotification } from '@/components/NotificationProviderComponent';
import { useForm } from 'react-hook-form';
import { useActionState, useEffect } from 'react';
import { createTaskAction } from '@/app/actions/taskAction';
import { ProjectStore } from '@/app/stores/project.store';

type TaskFormValues = {
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  projectId: string;
  taskId?: string | null;
};

export default function CreateTaskFormComponent(props: { taskId?: string }) {
  const { notify } = useNotification();
  const projects = ProjectStore((state) => state.projects);
  const initialState = null;
  const [state, formAction] = useActionState(createTaskAction, initialState);
  const setProjects = ProjectStore((state) => state.setProjects);
  const { taskId = null } = props;

  // Show toast when result updates
  useEffect(() => {
    if (state?.error) {
      notify(state.error, { type: 'error' });
    } else if (state?.success) {
      notify('Task created successfully!', { type: 'success' });
    }
  }, [state, notify]);

  useEffect(() => {
    setProjects(projects);
  }, [projects])

  const {
    register,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'MEDIUM',
      projectId: '',
      taskId: taskId 
    },
  });
  return (
    <form
      action={formAction}
      className="space-y-4 text-gray-900 dark:text-white transition-colors duration-200"
    >
      {/* Title */}
      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-100">Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-100">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-100">Priority</label>
        <select
          {...register('priority')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>

      {/* Projects */}
      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-100">Projects</label>
        <select
          {...register('projectId')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {projects.map((project: any, index: number) => <option key={index} value={project.id}>{project.name}</option>)}
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-100">Due Date</label>
        <input
          type="date"
          {...register('dueDate')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TaskId */}
      <div>
        <input
          type="hidden"
          {...register('taskId')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Create Task
      </button>
    </form>
  );
}
