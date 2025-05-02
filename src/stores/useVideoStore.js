import { create } from "zustand";

const useVideoStore = create((set) => ({
  videos: [],
  setVideos: (newVideos) => set({ videos: newVideos }),
}));

export default useVideoStore;
