'use client';


import { TaskStore } from '@/app/stores/task.store';
import { TaskItem } from './TaskItem';
import { format } from 'date-fns';


export default function TaskListComponent() {
    const tasks = TaskStore((state) => state.tasks);
    return (
        <div>
            {tasks && tasks.length > 0 && tasks.map((task: any, index: number) => (
                <TaskItem 
                    key={index} 
                    id={task.id}
                    title={task.title} 
                    date={format(task.dueDate, 'dd MMM yyyy')} 
                />
            ))}
        </div>
    );
}
