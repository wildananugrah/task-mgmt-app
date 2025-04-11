import { create } from "zustand";

export interface ISliderStore{
    openDashboardSlider: boolean,
    setOpenDashboardSlider: (dashboardSlider: any) => void,
    openProjectSlider: boolean,
    setOpenProjectSlider: (openProjectSlider: any) => void,
}

export const SlideStore = create<ISliderStore>((set) => ({
    openDashboardSlider: false,
    setOpenDashboardSlider: (openDashboardSlider: any) => set(() => ({ openDashboardSlider: openDashboardSlider })),
    openProjectSlider: false,
    setOpenProjectSlider: (openProjectSlider: any) => set(() => ({ openProjectSlider: openProjectSlider })),
}));