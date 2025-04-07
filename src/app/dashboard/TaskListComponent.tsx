'use client';

import { useEffect, useState } from 'react';
import { TaskItem } from './TaskItem';
import { fetchTasks } from '../actions/logics/tasks';
import { parseISO, format } from 'date-fns';

export default function TaskListComponent() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const fetchedTasks = await fetchTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        getTasks();
    }, []);

    return (
        <div>
            {tasks.map((task: any, index: number) => (
                <TaskItem key={index} title={task.title} date={format(parseISO(task.dueDate), 'dd MMM yyyy')} />
            ))}
        </div>
    );
}
