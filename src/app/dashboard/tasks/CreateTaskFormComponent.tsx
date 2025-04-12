'use client';

import { useNotification } from '@/components/NotificationProviderComponent';
import { useEffect, useState } from 'react';
import { ProjectStore } from '@/app/stores/project.store';
import { createTask, fetchLevelOneSubtask } from '@/app/actions/logics/tasks';
import { TaskStore } from '@/app/stores/task.store';
import RichTextEditorComponent from '@/components/RichTextEditorComponent';

export default function CreateTaskFormComponent(props: {
  taskId?: string,
  subTasks?: any,
  setSubTasks?: any
}) {
  const { notify } = useNotification();
  const projects = ProjectStore((state) => state.projects);
  const setProjects = ProjectStore((state) => state.setProjects);
  const setTasks = TaskStore((state) => state.setTasks);
  const tasks = TaskStore((state) => state.tasks);
  const { taskId = null, subTasks = null, setSubTasks = null } = props;
  const [richTextValue, setRichTextValue] = useState('');

  useEffect(() => {
    setProjects(projects);
  }, [projects])

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    projectId: '',
    taskId: taskId
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTaskData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form
      onSubmit={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
          taskData.description = richTextValue;
          const response = await createTask(taskData);
          setTasks([response, ...tasks]);
          if (taskId !== null) {
            const levelOneTask = await fetchLevelOneSubtask(taskId);
            setSubTasks(levelOneTask);
          }
          notify("Task created successfully", { type: "success" });
        } catch (error: any) {
          notify("Task failed to create", { type: "error" });
        }
      }}
      className="space-y-4 text-gray-900 dark:text-white transition-colors duration-200"
    >
      {/* Title */}
      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-100">Title</label>
        <input
          name='title'
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-100">Description</label>
        <div className='bg-white'>
          <RichTextEditorComponent value={richTextValue} setValue={setRichTextValue} />
        </div>
        {/* <textarea
          name='description'
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
      </div>

      {/* Priority */}
      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-100">Priority</label>
        <select
          name='priority'
          onChange={handleChange}
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
          name='projectId'
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value=''>-- choose projects --</option>
          {projects.map((project: any, index: number) => <option key={index} value={project.id}>{project.name}</option>)}
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-100">Due Date</label>
        <input
          name='dueDate'
          type="date"
          onChange={handleChange}
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
