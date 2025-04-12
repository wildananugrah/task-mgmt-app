'use client';

import { useNotification } from '@/components/NotificationProviderComponent';
import { useState } from 'react';
import { createProject } from '@/app/actions/logics/projects';
import { ProjectStore } from '@/app/stores/project.store';
import RichTextEditorComponent from '@/components/RichTextEditorComponent';

type ProjectFormValues = {
  title: string;
  description?: string;
};

export default function CreateProjectFormComponent() {
  const { notify } = useNotification();
  const setProjects = ProjectStore((state) => state.setProjects);
  const projects = ProjectStore((state) => state.projects);
  const [projectData, setProjectData] = useState({
    title: '',
    description: ''
  });
  const [richTextValue, setRichTextValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProjectData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form
      onSubmit={async (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        try {
          projectData.description = richTextValue;
          const response = await createProject(projectData);
          setProjects([response, ...projects]);
          notify("Project created successfully", { type: "success" });
        } catch (error: any) {
          notify("Project failed to create", { type: "error" });
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
        <div className='bg-white' >
          <RichTextEditorComponent value={richTextValue} setValue={setRichTextValue} />
        </div>
        {/* <textarea
          name='description'
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
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
