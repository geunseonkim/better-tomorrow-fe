// import { useQuery } from "@tanstack/react-query";
// import api from "../utils/api";

// const fetchChannelInfo = () => {
//   return api.get("/channels", {
//     params: {
//       part: "snippet",
//       id: "UCX6OQ3DkcsbYNE6H8uQQuVA",
//       key: import.meta.env.VITE_YOUTUBE_API_KEY,
//     },
//   });
// };

// export const useChannelInfoQuery = () => {
//   return useQuery({
//     queryKey: ["channelInfo"],
//     queryFn: fetchChannelInfo,
//     select: (result) => result.data.items[0],
//   });
// };
