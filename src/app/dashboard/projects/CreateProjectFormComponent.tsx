'use client';

import { useNotification } from '@/components/NotificationProviderComponent';
import { useForm } from 'react-hook-form';
import { useActionState, useEffect } from 'react';
import { createProjectAction } from '@/app/actions/projectAction';

type ProjectFormValues = {
  title: string;
  description?: string;
};

export default function CreateProjectFormComponent() {
  const { notify } = useNotification();

  const initialState = null;
  const [state, formAction] = useActionState(createProjectAction, initialState);

  // Show toast when result updates
  useEffect(() => {
    if (state?.error) {
      notify(state.error, { type: 'error' });
    } else if (state?.success) {
      notify('Project created successfully!', { type: 'success' });
    }
  }, [state, notify]);

  const {
    register,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    defaultValues: {
      title: '',
      description: ''
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


      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Create Project
      </button>
    </form>
  );
}
