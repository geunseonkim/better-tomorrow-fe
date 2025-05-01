import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// const fetchTopVideoDetail = (videoIds) => {
//   return api.get("/videos", {
//     params: {
//       part: "snippet,statistics,contentDetails",
//       id: videoIds.join(","),
//       key: import.meta.env.VITE_YOUTUBE_API_KEY,
//     },
//   });
// };

// export const useTopVideoDetailQuery = (videoIds) => {
//   return useQuery({
//     queryKey: ["topVideoDetail", videoIds],
//     queryFn: () => fetchTopVideoDetail(videoIds),
//     enabled: !!videoIds?.length,
//     select: (result) => result.data.items,
//   });
// };

//UI + 디자인용 코드
const fixedVideoIds = ["U_LlX4t0A9I", "K_CbgLpvH9E", "NDsO1LT_0lw", "uyiG6uw-6pA"];

const fetchTopVideoDetail = () => {
  return api.get("/videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      id: fixedVideoIds.join(","),
      key: import.meta.env.VITE_YOUTUBE_API_KEY,
    },
  });
};

export const useTopVideoDetailQuery = () => {
  return useQuery({
    queryKey: ["topVideoDetail"],
    queryFn: fetchTopVideoDetail,
    select: (result) => result.data.items,
  });
};
