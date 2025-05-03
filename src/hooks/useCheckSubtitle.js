import { useQuery } from "@tanstack/react-query";
import api from "../utils/youtubeApi";

const getCaptions = async (videoId) => {
  const { data } = await api.get("/captions", {
    params: {
      part: "snippet",
      videoId,
    },
  });
  return data.items;
};

export const useCheckSubtitleQuery = (videoId) => {
  return useQuery({
    queryKey: ["isCaptions", videoId],
    queryFn: () => getCaptions(videoId),
    select: (data) => data.length > 0, // // 자막이 하나라도 있으면 true 반환
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    enabled: !!videoId,
  });
};
