import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import VideoCard from "./VideoCard";
import { usePlaylistVideosQuery } from "../hooks/usePlaylistVideos";
import { useVideoDetailsQuery } from "../hooks/useVideoDetails";
import { videoDataToString } from "../utils/dataFormatUtils";

const Carousel = ({
  playlistId = "PLoSWVnSA9vG8SK6-_45PAu6RVTaP1zXHf",
  handleFirstVideoId,
  breakpoints = {
    0: { slidesPerView: 1, slidesPerGroup: 1 },
    640: { slidesPerView: 2, slidesPerGroup: 2 },
    900: { slidesPerView: 3, slidesPerGroup: 2 },
    1200: { slidesPerView: 4, slidesPerGroup: 2 },
  },
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { data: playlistData } = usePlaylistVideosQuery(playlistId);
  const idsParam = videoDataToString(playlistData);
  const { data: videos } = useVideoDetailsQuery(idsParam);

  useEffect(() => {
    if (videos && videos.length > 0) {
      handleFirstVideoId(videos[0].videoId);
    }
  }, [videos, handleFirstVideoId]);

  return (
    <div className="w-full py-5 flex justify-center">
      <div className="relative w-full max-w-[1400px] px-4 mx-auto">
        <Swiper
          modules={[Navigation]}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          // slidesPerView={4}
          // slidesPerGroup={2}
          breakpoints={breakpoints}
          spaceBetween={40}
          className="h-full"
        >
          {videos?.map((video) => (
            <SwiperSlide key={video.videoId}>
              <VideoCard video={video} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* 버튼 스타일 커스텀 */}
        <button
          ref={prevRef}
          className="custom-left-arrow absolute left-[-15px] top-1/2 -translate-y-1/2 z-10 bg-white border border-neutral-300 rounded-full w-12 h-12 flex justify-center items-center hover:bg-neutral-200 cursor-pointer"
        >
          <IoIosArrowBack className="w-6 h-6" />
        </button>
        <button
          ref={nextRef}
          className="custom-right-arrow absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 bg-white border border-neutral-300 rounded-full w-12 h-12 flex justify-center items-center hover:bg-neutral-200 cursor-pointer"
        >
          <IoIosArrowForward className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
