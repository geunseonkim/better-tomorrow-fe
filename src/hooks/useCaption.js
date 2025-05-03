import { useQuery, useQueries } from "@tanstack/react-query";
import server from "../utils/server";

const languages = ["en", "ko"];

const fetchCaption = async (videoId, lang) => {
  const { data } = await server.get(`/captions`, {
    params: {
      videoId,
      lang,
    },
  });
  if (!data) {
    data = null;
  }
  return { lang, data: data };
};

export const useCaptionDataQuery = (videoId) => {
  const captionData = useQueries({
    queries: languages.map((lang) => ({
      queryKey: ["caption", videoId, lang],
      queryFn: () => fetchCaption(videoId, lang),
      retry: 1,
      staleTime: 1000 * 60 * 60, // 1 hour
      enabled: !!videoId,
    })),
  });

  const isLoading = captionData.some((q) => q.isLoading);
  const isError = captionData.some((q) => q.isError);
  const error = captionData.find((q) => q.isError)?.error;
  const englishCaption = captionData.find((q) => q?.data?.lang === "en")?.data
    .data;
  const koreanCaption = captionData.find((q) => q?.data?.lang === "ko")?.data
    .data;

  return { isLoading, isError, error, englishCaption, koreanCaption };
};
