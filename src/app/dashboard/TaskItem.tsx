import { fetchTaskDetail } from "../actions/logics/tasks";
import { SlideStore } from "../stores/slider.store";
import { TaskStore } from "../stores/task.store";

interface TaskItemProps {
  title: string;
  date: string;
  id: string;
}

export function TaskItem({ title, date, id }: TaskItemProps) {
  const setCurrentTask = TaskStore((state) => state.setCurrentTask);
  const openDashboardSlider = SlideStore((state) => state.openDashboardSlider);
  const setOpenDashboardSlider = SlideStore((state) => state.setOpenDashboardSlider);
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
      <div className="flex items-center gap-4">
        <input type="checkbox" className="w-5 h-5" />
        <div>
          <p
            className="font-medium cursor-pointer hover:underline"
            onClick={async (e) => {
              const taskDetail = await fetchTaskDetail(id);
              setCurrentTask(taskDetail);
              setOpenDashboardSlider(!openDashboardSlider);
            }}
          >{title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>
      {/* <span className="text-lg">→</span> */}
    </div>
  );
}