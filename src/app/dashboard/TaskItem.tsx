interface TaskItemProps {
  title: string;
  date: string;
}

export function TaskItem({ title, date }: TaskItemProps) {
    return (
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
        <div className="flex items-center gap-4">
          <input type="checkbox" className="w-5 h-5" />
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
          </div>
        </div>
        <span className="text-lg">→</span>
      </div>
    );
  }