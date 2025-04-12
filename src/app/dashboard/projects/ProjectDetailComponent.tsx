import { updateProjectDetail } from "@/app/actions/logics/projects";
import { ProjectStore } from "@/app/stores/project.store";
import { SlideStore } from "@/app/stores/slider.store";
import ModalComponent from "@/components/ModalComponent";
import { useNotification } from "@/components/NotificationProviderComponent";
import { useEffect, useState } from "react";
import DeleteProjectConfirmationComponent from "./DeleteProjectConfirmationComponent";
import RichTextEditorComponent from "@/components/RichTextEditorComponent";

export default function ProjectDetailComponent() {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [richTextValue, setRichTextValue] = useState('');
    const [projectData, setProjectData] = useState({
        name: '',
        description: ''
    });
    const { notify } = useNotification();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const openProjectSlider = SlideStore((state) => state.openProjectSlider);
    const setOpenProjectSlider = SlideStore((state) => state.setOpenProjectSlider);
    const currentProject = ProjectStore((state) => state.currentProject);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setProjectData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        if (currentProject) {
            setProjectData({
                name: currentProject.name,
                description: currentProject.description,
            });
            setRichTextValue(currentProject.description);
        }
    }, [currentProject])
    return (
        <main className="max-w-4xl mx-auto px-4 py-10">

            <div className="mb-2">
                {editingField === 'title' ? (
                    <div className='flex flex-col space-y-2'>
                        <input
                            name="title"
                            value={projectData.name}
                            onChange={handleChange}
                            onBlur={() => setEditingField(null)}
                            autoFocus
                            className="text-4xl font-bold text-gray-900 w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                        />
                    </div>
                ) : (
                    <div className='flex flex-col space-y-2'>
                        <h1
                            className="text-4xl font-bold text-gray-900 cursor-pointer"
                            onClick={() => setEditingField('title')}
                        >
                            {projectData.name}
                        </h1>
                    </div>
                )}
            </div>

            <section className="mb-6">
                <h2 className="font-semibold text-lg mb-1 text-black">Description</h2>
                {editingField === 'description' ? (
                    <div className='bg-white' >
                        <RichTextEditorComponent value={richTextValue} setValue={setRichTextValue} onBlur={() => setEditingField(null)} />
                    </div>
                ) : (
                    <div
                        className="prose max-w-none text-gray-600 text-sm"
                        onClick={() => setEditingField('description')}
                    >
                        <div dangerouslySetInnerHTML={{ __html: richTextValue }} />
                    </div>
                )}
            </section>


            <div className="flex justify-end space-x-4">
                <button
                    onClick={() => setOpenProjectSlider(!openProjectSlider)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                >
                    Delete
                </button>
                <button
                    onClick={async () => {
                        try {
                            projectData.description = richTextValue;
                            await updateProjectDetail(currentProject.id, projectData);
                            notify('Project updated successfully!', { type: 'success' });
                        } catch (error: any) {
                            console.error(error);
                            notify('Project updated action error!', { type: 'error' });
                        }
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    Save changes
                </button>
            </div>
            <ModalComponent isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
                <DeleteProjectConfirmationComponent
                    setShowDeleteConfirm={setShowDeleteConfirm}
                    showDeleteConfirm={showDeleteConfirm}
                    projectData={projectData}
                    setProjectData={setProjectData}
                />
            </ModalComponent>
        </main>
    )
}