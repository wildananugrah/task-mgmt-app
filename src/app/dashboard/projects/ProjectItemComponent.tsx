import { fetchProjectDetail } from "@/app/actions/logics/projects";
import { ProjectStore } from "@/app/stores/project.store";
import { SlideStore } from "@/app/stores/slider.store";

export default function ProjectItemComponent(props: { id: string, title: string }) {
    const { id, title } = props;
    const openProjectSlider = SlideStore((state) => state.openDashboardSlider);
    const setOpenProjectSlider = SlideStore((state) => state.setOpenProjectSlider);
    const setCurrentProject = ProjectStore((state) => state.setCurrentProject);

    return (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-4">
                <input type="checkbox" className="w-5 h-5" />
                <div>
                    <p
                        className="font-medium cursor-pointer hover:underline"
                        onClick={async (e) => {
                            const projectDetail = await fetchProjectDetail(id);
                            setCurrentProject(projectDetail);
                            setOpenProjectSlider(!openProjectSlider);
                        }}
                    >{title}</p>
                </div>
            </div>
        </div>
    );
}