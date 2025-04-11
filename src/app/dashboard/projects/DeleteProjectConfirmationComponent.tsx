
import { deleteProject } from "@/app/actions/logics/projects";
import { ProjectStore } from "@/app/stores/project.store";
import { SlideStore } from "@/app/stores/slider.store";
import { useNotification } from "@/components/NotificationProviderComponent";

export default function DeleteProjectConfirmationComponent(
    props: {
        setShowDeleteConfirm: any, showDeleteConfirm: boolean,
        projectData: any, setProjectData: any
    }
) {
    const { setShowDeleteConfirm, showDeleteConfirm, projectData, setProjectData } = props;
    const currentProject = ProjectStore((state) => state.currentProject);
    const openProjectSlider = SlideStore((state) => state.openProjectSlider);
    const setOpenProjectSlider = SlideStore((state) => state.setOpenProjectSlider);
    const { notify } = useNotification();
    const projects = ProjectStore((state) => state.projects);
    const setProjects = ProjectStore((state) => state.setProjects);

    return (
        <div className="flex flex-col space-y-2">
            <p className='text-gray-600'>Are you sure you want to delete this project ?</p>
            <div className='flex flex-row space-x-4'>
                <button
                    onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    onClick={async () => {
                        try {
                            await deleteProject(currentProject.id);
                            notify('Project deleted successfully!', { type: 'success' });
                            setShowDeleteConfirm(!showDeleteConfirm);
                            setOpenProjectSlider(!openProjectSlider);
                            setProjects(projects.filter((project: any, index: number) => project.id !== currentProject.id));
                        } catch (error: any) {
                            console.error(error);
                            notify('Project deleted action error!', { type: 'error' });
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