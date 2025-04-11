'use client';

import ProjectItemComponent from './ProjectItemComponent';
import { ProjectStore } from '@/app/stores/project.store';


export default function ProjectListComponent() {
    const projects = ProjectStore((state) => state.projects);
    return (
        <div>
            {projects && projects.length > 0 && projects.map((project: any, index: number) => (
                <ProjectItemComponent
                    key={index} 
                    id={project.id}
                    title={project.name} 
                />
            ))}
        </div>
    );
}
