import { useQuery } from "@tanstack/react-query";
import api from "../utils/youtubeApi";
import { formatDuration, formatDate } from "../utils/dataFormatUtils";

const getVideoDetails = async (videoIds) => {
  const { data } = await api.get("/videos", {
    params: {
      part: "id,snippet,contentDetails,statistics",
      id: videoIds,
      fields:
        "items(id,snippet(publishedAt,title, description, thumbnails, channelTitle), contentDetails(duration), statistics(viewCount, likeCount))",
    },
  });

  return data;
};

const selectData = (data) => {
  return data.items.map((item) => ({
    videoId: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.standard.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: formatDate(item.snippet.publishedAt),
    duration: formatDuration(item.contentDetails.duration),
    viewCount: item.statistics.viewCount,
    likeCount: item.statistics.likeCount,
  }));
};

export const useVideoDetailsQuery = (videoIds) => {
  return useQuery({
    queryKey: ["videoDetails", videoIds],
    queryFn: () => getVideoDetails(videoIds),
    retry: 1,
    enabled: !!videoIds && videoIds.length > 0,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    select: (data) => selectData(data),
  });
};
