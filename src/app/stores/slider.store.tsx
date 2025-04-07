import { create } from "zustand";

export interface ISliderStore{
    openDashboardSlider: boolean,
    setOpenDashboardSlider: (dashboardSlider: any) => void,
}

export const SlideStore = create<ISliderStore>((set) => ({
    openDashboardSlider: false,
    setOpenDashboardSlider: (openDashboardSlider: any) => set(() => ({ openDashboardSlider: openDashboardSlider })),
}));