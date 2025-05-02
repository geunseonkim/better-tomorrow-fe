import React from "react";
import { useMockVideosQuery } from "../../hooks/useMockVideos";

const RecommendVideos = () => {
  const { data } = useMockVideosQuery();
  console.log("MOCKKKKK", data);

  return <div>추천영상 페이지</div>;
};

export default RecommendVideos;
