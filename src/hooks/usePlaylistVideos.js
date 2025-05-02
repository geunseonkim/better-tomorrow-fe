import { useQuery } from "@tanstack/react-query";
import api from "../utils/youtubeApi";

// const playlistId = "PLoSWVnSA9vG8SK6-_45PAu6RVTaP1zXHf"; //예시

const getVideosByPlaylist = async (playlistId) => {
  const { data } = await api.get("/playlistItems", {
    params: {
      part: "contentDetails",
      maxResults: 15,
      playlistId,
      fields: "items(contentDetails(videoId))",
    },
  });

  return data.items.map((item) => ({
    videoId: item.contentDetails.videoId,
  }));
};

export const usePlaylistVideosQuery = (playlistId) => {
  return useQuery({
    queryKey: ["playlistVideos", playlistId],
    queryFn: () => getVideosByPlaylist(playlistId),
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    enabled: !!playlistId,
  });
};
