import React, { useState, useEffect, useMemo } from "react";
import { useMockVideosQuery } from "../../hooks/useMockVideos";
import { useVideoDetailsQuery } from "../../hooks/useVideoDetails";
import { videoDataToString } from "../../utils/dataFormatUtils";
import { useNavigate } from "react-router-dom";
import VideoCard from "../../common/VideoCard";
import FilterBar from "./FilterBar";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdArrowBackIos,
  MdArrowForwardIos,
} from "react-icons/md";

const sortOptions = [
  "전체보기",
  "조회 높은순",
  "조회 낮은순",
  "좋아요 많은순",
  "좋아요 적은순",
  "최신순",
  "오래된순",
];

const RecommendVideos = () => {
  const navigate = useNavigate();

  const {
    data: mockVideos = [],
    isLoading: isMockLoading,
    isError: isMockError,
    error: mockError,
  } = useMockVideosQuery();
  const idsParam = videoDataToString(mockVideos);
  const {
    data: details = [],
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
  } = useVideoDetailsQuery(idsParam);

  // 로딩중, 로딩스피너
  // if (isMockLoading || isDetailsLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <span className="loading loading-spinner text-primary"></span>
  //     </div>
  //   );
  // }

  //에러핸들링
  // if (isMockError || isDetailsError) {
  //   const message =
  //     mockError?.message ||
  //     detailsError?.message ||
  //     "예기치 못한 오류가 발생했습니다";
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen">
  //       <img
  //         src="https://www.youtube.com/img/desktop/unavailable/unavailable_video.png"
  //         alt="error"
  //         className="w-1/4 h-1/4"
  //       />
  //       <div className="text-lg mb-4">존재하지 않는 비디오입니다</div>
  //       <div className="text-sm text-gray-600 mb-6">{message}</div>
  //       <button
  //         className="btn btn-soft btn-primary rounded-lg"
  //         onClick={() => navigate("/")}
  //       >
  //         홈으로 가기
  //       </button>
  //     </div>
  //   );
  // }

  const [selectedSort, setSelectedSort] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const sorted = useMemo(() => {
    switch (selectedSort) {
      case "조회 높은순":
        return [...details].sort(
          (a, b) => Number(b.viewCount) - Number(a.viewCount)
        );
      case "조회 낮은순":
        return [...details].sort(
          (a, b) => Number(a.viewCount) - Number(b.viewCount)
        );
      case "좋아요 많은순":
        return [...details].sort(
          (a, b) => Number(b.likeCount) - Number(a.likeCount)
        );
      case "좋아요 적은순":
        return [...details].sort(
          (a, b) => Number(a.likeCount) - Number(b.likeCount)
        );
      case "최신순":
        return [...details].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
      case "오래된순":
        return [...details].sort(
          (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
        );
      default:
        return details;
    }
  }, [details, selectedSort]);

  // pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <section>
          <h1 className="text-2xl font-bold mb-1">추천 영상</h1>
          <p className="text-gray-600 mb-6 text-sm">
            자막과 함께 추천 영상을 시청하며 영어 실력을 한 단계 끌어올려보세요!
          </p>

          <FilterBar
            filters={sortOptions}
            selected={selectedSort}
            onChange={(label) => {
              setSelectedSort(label);
              setCurrentPage(1);
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginated.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
          {/* 페이지네이션 버튼 - DaisyUI 적용 */}
          <div className="flex justify-center mt-6 space-x-2">
            {/* 맨 앞으로 이동 */}
            <button
              className="btn btn-md text-xl"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <MdKeyboardDoubleArrowLeft className="w-6 h-6" />
            </button>
            {/* 한 페이지 뒤로 */}
            <button
              className="btn btn-md text-xl"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <MdArrowBackIos className="w-4 h-4" />
            </button>
            {/* 페이지 번호 */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`btn btn-md ${currentPage === i + 1 ? "btn-active" : ""}`}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {i + 1}
              </button>
            ))}
            {/* 한 페이지 앞으로 */}
            <button
              className="btn btn-md text-xl"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <MdArrowForwardIos className="w-4 h-4" />
            </button>
            {/* 맨 끝으로 이동 */}
            <button
              className="btn btn-md text-xl"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              <MdKeyboardDoubleArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecommendVideos;
