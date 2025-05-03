import { useQuery, useQueries } from "@tanstack/react-query";
import { sanity } from "../lib/sanityClient.js";
import { cache } from "react";

const languages = ["en", "ko"];

const fetchSanity = async (videoId, lang) => {
  const result = await sanity.fetch(
    `*[_type == "caption" && videoId == $videoId && lang == $lang][0]`,
    { videoId, lang }
  );

  return { lang, data: result?.data };
};

export const useSanityCaptionQuery = (videoId) => {
  const captionData = useQueries({
    queries: languages.map((lang) => ({
      queryKey: ["caption-sanity", videoId, lang],
      queryFn: () => fetchSanity(videoId, lang),
      retry: 1,
      staleTime: 1000 * 60 * 60, // 1 hour
      enabled: !!videoId,
    })),
  });

  const sanityLoading = captionData.some((q) => q.isLoading);
  const sanityIsError = captionData.some((q) => q.isError);
  const sanityError = captionData.find((q) => q.isError)?.error;
  const sanityEnglish = captionData.find((q) => q.data?.lang === "en")?.data
    ?.data;
  const sanityKorean = captionData.find((q) => q.data?.lang === "ko")?.data
    ?.data;
  const sanityNotFound = captionData.every((q) => q.data?.data === undefined);

  return {
    sanityLoading,
    sanityIsError,
    sanityError,
    sanityEnglish,
    sanityKorean,
    sanityNotFound,
  };
};
