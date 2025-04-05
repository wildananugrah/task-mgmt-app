interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

export function NavItem({ icon, label, active = false }: NavItemProps) {
    return (
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${active
            ? "bg-gray-200 dark:bg-gray-700 font-semibold"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
      >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </div>
    );
  }