import { deleteTask } from "@/app/actions/logics/tasks";
import { SlideStore } from "@/app/stores/slider.store";
import { TaskStore } from "@/app/stores/task.store";
import { useNotification } from "@/components/NotificationProviderComponent";

export default function DeleteTaskConfirmationComponent(props: {
    setShowDeleteConfirm: any, showDeleteConfirm: boolean,
    taskData: any, setTaskData: any
}) {
    const { setShowDeleteConfirm, showDeleteConfirm, taskData, setTaskData } = props;
    const currentTask = TaskStore((state) => state.currentTask);
    const openDashboardSlider = SlideStore((state) => state.openDashboardSlider);
    const setOpenDashboardSlider = SlideStore((state) => state.setOpenDashboardSlider);
    const { notify } = useNotification();
    const tasks = TaskStore((state) => state.tasks);
    const setTasks = TaskStore((state) => state.setTasks);
    
    return (
        <div className="flex flex-col space-y-2">
            <p className='text-gray-600'>Are you sure you want to delete this task ?</p>
            <div className='flex flex-row space-x-4'>
                <button
                    onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    onClick={async () => {
                        taskData.dueDate = new Date(taskData.dueDate).toISOString();
                        try {
                            await deleteTask(currentTask.id);
                            notify('Task deleted successfully!', { type: 'success' });
                            setShowDeleteConfirm(!showDeleteConfirm);
                            setOpenDashboardSlider(!openDashboardSlider);
                            setTasks(tasks.filter((task: any, index: number) => task.id !== currentTask.id));
                        } catch (error: any) {
                            console.error(error);
                            notify('Task deleted action error!', { type: 'error' });
                        }
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}