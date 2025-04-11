import { create } from "zustand";

export interface IProjectTask{
    projects: any,
    setProjects: (projects: any) => void,
    currentProject: any,
    setCurrentProject: (currentProject: any) => void
}

export const ProjectStore = create<IProjectTask>((set) => ({
    projects: [],
    setProjects: (projects: any) => set(() => ({ projects: projects })),
    currentProject: null,
    setCurrentProject: (currentProject: any) => set(() => ({ currentProject: currentProject })),
}));