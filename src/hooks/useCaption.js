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

export const useCaptionDataQuery = (videoId, options = {}) => {
  const captionData = useQueries({
    queries: languages.map((lang) => ({
      queryKey: ["caption", videoId, lang],
      queryFn: () => fetchCaption(videoId, lang),
      retry: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60,
      enabled: !!videoId && options.enabled !== false,
    })),
  });

  const isLoading = captionData.some((q) => q.isLoading);
  const isError = captionData.some((q) => q.isError);
  const error = captionData.find((q) => q.isError)?.error;
  const englishCaptionAPI = captionData.find((q) => q?.data?.lang === "en")
    ?.data.data;
  const koreanCaptionAPI = captionData.find((q) => q?.data?.lang === "ko")?.data
    .data;

  return { isLoading, isError, error, englishCaptionAPI, koreanCaptionAPI };
};
