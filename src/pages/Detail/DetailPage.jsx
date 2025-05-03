import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "./components/Video";
import Subtitles from "./components/Subtitles";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useVideoDetailsQuery } from "../../hooks/useVideoDetails";
import { useNavigate } from "react-router";
import MultiCarousel from "../MultiCarousel/MultiCarousel";

const DetailPage = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState(null);
  const { id } = useParams();
  const [searchWord, setSearchWord] = useState("");
  const { data, isLoading: videoLoading, isError, error } = useVideoDetailsQuery(id);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("you searched: ", searchWord);
  }, [searchWord]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
      {videoLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : isError || data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <img
            src="https://www.youtube.com/img/desktop/unavailable/unavailable_video.png"
            alt="error"
            className="w-1/4 h-1/4"
          />
          <div className="text-lg">존재하지 않는 비디오입니다</div>
          <button
            className="btn btn-soft btn-primary mt-10 rounded-lg"
            onClick={() => navigate("/")}
          >
            홈으로 가기
          </button>
        </div>
      ) : (
        <div className="min-h-screen py-6 px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 비디오 플레이어 */}
            <Video
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              player={player}
              setPlayer={setPlayer}
              videoId={id}
              data={data}
            />
            {/* 자막 */}
            <div className="lg:w-4/12 border border-gray-100 rounded-md overflow-hidden h-fit">
              <div className="bg-gray-100/50 p-2">
                <div className="flex gap-1">
                  <button className="btn flex-1">
                    <IoDocumentTextOutline className="h-4 w-4 mr-2" />
                    자막
                  </button>
                </div>
              </div>
              <Subtitles
                videoId={id}
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
                player={player}
                setSearchWord={setSearchWord}
              />
            </div>
          </div>
          {/* 캐러셀 */}
          <div className="mt-10">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">추천 영상</h2>
                <p className="text-md pt-2 text-gray-500">
                  자막으로 더 쉽게 이해할 수 있는 영상들을 확인해보세요.
                </p>
              </div>
            </div>
            <MultiCarousel />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
