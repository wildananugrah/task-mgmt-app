'use client';

import { ProjectStore } from "@/app/stores/project.store";
import DashboardLayout from "@/components/DashboardLayout";
import ModalComponent from "@/components/ModalComponent";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import CreateProjectFormComponent from "./CreateProjectFormComponent";
import ProjectListComponent from "./ProjectListComponent";
import SlidedInDrawerComponent from "@/components/SlidedInDrawerComponent";
import { SlideStore } from "@/app/stores/slider.store";
import ProjectDetailComponent from "./ProjectDetailComponent";
import { fetchProjectsSearch } from "@/app/actions/logics/projects";


export default function ClientProjectComponent(props: { session: Session, projects: any }) {
    const { session, projects } = props;
    const [showModal, setShowModal] = useState(false);
    const setProjects = ProjectStore((state) => state.setProjects);
    const openProjectSlider = SlideStore((state) => state.openProjectSlider);
    const setOpenProjectSlider = SlideStore((state) => state.setOpenProjectSlider);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(async () => {
            if (value.trim() === '') {
                setProjects(projects); // Reset
            } else {
                const filteredProjects = await fetchProjectsSearch(value);
                setProjects(filteredProjects);
            }
        }, 400); // 400ms debounce
    };
    useEffect(() => {
        setProjects(projects);
    }, [projects]);
    return (
        <>
            <DashboardLayout session={session}>
                <h1 className="text-2xl font-semibold mb-4">Projects</h1>
                <div className="mb-6">
                    <input
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search projects and teams"
                        className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm outline-none"
                    />
                </div>
                <div className="space-y-3">
                    <ProjectListComponent />
                </div>
                <div className="mt-8">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        onClick={(e: any) => setShowModal(!showModal)}
                    >
                        Create project
                    </button>
                </div>
            </DashboardLayout>
            <ModalComponent isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">
                    <CreateProjectFormComponent />
                </div>
            </ModalComponent>
            <SlidedInDrawerComponent isOpen={openProjectSlider} onClose={() => setOpenProjectSlider(false)} from="right">
                <ProjectDetailComponent />
            </SlidedInDrawerComponent>
        </>
    );
}