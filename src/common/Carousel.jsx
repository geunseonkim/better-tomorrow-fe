import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import VideoCard from "./VideoCard";
import { useTopVideoDetailQuery } from "../hooks/useTopVideoDetail";

const Carousel = () => {
  const { data: videos = [] } = useTopVideoDetailQuery();

  return (
    <div className="w-full h-screen p-10">
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-left-arrow",
            nextEl: ".custom-right-arrow",
          }}
          onInit={(swiper) => {
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          slidesPerView={4}
          slidesPerGroup={4}
          spaceBetween={40}
          className="h-full"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <VideoCard video={video} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="custom-left-arrow absolute left-[-25px] top-1/2 -translate-y-1/2 z-10 bg-white border border-neutral-300 rounded-full w-12 h-12 flex justify-center items-center">
          <IoIosArrowBack className="w-6 h-6" />
        </button>
        <button className="custom-right-arrow absolute right-[-25px] top-1/2 -translate-y-1/2 z-10 bg-white border border-neutral-300 rounded-full w-12 h-12 flex justify-center items-center">
          <IoIosArrowForward className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
