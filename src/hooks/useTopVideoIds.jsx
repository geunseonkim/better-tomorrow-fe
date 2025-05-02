// // "/search" 이용해서 조회높은 8개 영상 불러오기+제목

// import { useQuery } from "@tanstack/react-query";
// import api from "../utils/api";

// const CHANNEL_ID = "UCX6OQ3DkcsbYNE6H8uQQuVA";

// const fetchTopVideoIds = () => {
//   return api.get("/search", {
//     params: {
//       part: "snippet",
//       channelId: CHANNEL_ID,
//       maxResults: 8,
//       order: "viewCount",
//       type: "video",
//       key: import.meta.env.VITE_YOUTUBE_API_KEY,
//     },
//   });
// };

// export const useTopVideoIdsQuery = () => {
//   return useQuery({
//     queryKey: ["topVideoIds"],
//     queryFn: fetchTopVideoIds,
//     enabled: false, //자동 호출 방지
//     refetchOnWindowFocus: false, // 창 다시 돌아와도 안 함
//     refetchOnReconnect: false, // 네트워크 복구돼도 안 함
//     select: (result) => {
//       const items = result.data.items;
//       return items.map((item) => item.id.videoId);
//     },
//   });
// };
