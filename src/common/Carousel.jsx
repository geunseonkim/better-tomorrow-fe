import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";

const Carousel = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/videos");
        // console.log("DDDDATA", response.data);
        setVideos(response.data);
      } catch (error) {
        console.log("API fetching errorrrrr", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="w-full h-screen p-10">
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={40}
        className="h-full"
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <div className="overflow-hidden rounded-xl w-60 h-60 border border-gray-400 ">
              <iframe
                src={video.url}
                title={video.title}
                width="240"
                height="130"
                allowFullScreen
              />
              <div className="p-2">{video.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
