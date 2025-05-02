import React, { useEffect } from "react";
import { useMockVideosQuery } from "../../hooks/useMockVideos";
import { useVideoDetailsQuery } from "../../hooks/useVideoDetails";
import { videoDataToString } from "../../utils/dataFormatUtils";
import useVideoStore from "../../stores/useVideoStore";
import VideoCard from "../../common/VideoCard";

const filterNames = ["전체", "건강", "디자인", "과학", "기후변화"];

const RecommendVideos = () => {
  const { data: mockVideos = [] } = useMockVideosQuery();
  const setVideos = useVideoStore((state) => state.setVideos);
  const idsParam = videoDataToString(mockVideos);
  const { data: details = [] } = useVideoDetailsQuery(idsParam, {
    enabled: !!idsParam,
  });

  useEffect(() => {
    if (details.length > 0) {
      setVideos(details);
    }
  }, [details]);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <section>
          <h1 className="text-2xl font-bold mb-1">추천 영상</h1>
          <p className="text-gray-600 mb-6 text-sm">
            자막과 함께 추천 영상을 시청하며 영어 실력을 한 단계 끌어올려보세요!
          </p>

          {/* 필터링 - 시간남으면 -> 추가기능 */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {filterNames.map((name, index) => (
              <button
                key={index}
                className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium"
              >
                {name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {details.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecommendVideos;
