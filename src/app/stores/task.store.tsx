import { create } from "zustand";

export interface ITaskStore{
    tasks: any,
    setTasks: (tasks: any) => void,
    subTasks: any,
    setSubTasks: (tasks: any) => void,
    currentTask: any,
    setCurrentTask: (currentTask: any) => void,
    currentSubTask: any,
    setCurrentSubTask: (currentSubTask: any) => void
}

export const TaskStore = create<ITaskStore>((set) => ({
    tasks: [],
    setTasks: (tasks: any) => set(() => ({ tasks: tasks })),
    subTasks: [],
    setSubTasks: (subTasks: any) => set(() => ({ subTasks: subTasks })),
    currentTask: null,
    setCurrentTask: (currentTask: any) => set(() => ({ currentTask: currentTask })),
    currentSubTask: null,
    setCurrentSubTask: (currentSubTask: any) => set(() => ({ currentSubTask: currentSubTask }))
}));