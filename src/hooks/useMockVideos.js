import { useQuery } from "@tanstack/react-query";
import mockApi from "../utils/mockApi";

const fetchMockVideos = async () => {
  const { data } = await mockApi.get("/mockvideos");
  return data;
};

export const useMockVideosQuery = () => {
  return useQuery({
    queryKey: ["mockVideos"],
    queryFn: fetchMockVideos,
  });
};
