import React, { useState } from "react";
import Search from "../../../common/Search";

const Banner = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* 배경 비디오 */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onCanPlay={() => setIsVideoLoaded(true)}
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      {/* 배너 내용 */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4 md:px-6">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl mb-5">
          Youtube 영상의 자막으로 쉽게 공부해보세요.
        </h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-white/80 mb-8 leading-relaxed text-pretty">
          Subtube는 YouTube 영상의 자막을 쉽게 확인하고, 번역할 수 있는
          서비스입니다. <br />
          실제 상황 속 자연스러운 언어로 청취력을 향상시켜보세요.
        </p>

        {/* url 입력 폼 */}
        <Search />
        <p className="text-xs md:text-sm text-white/70 mt-4 break-words text-pretty text-center max-w-sm">
          <span className="font-bold">Tip : </span>
          YouTube에서 자막(CC) 버튼이 활성화된 영상을 찾아보세요.
        </p>
      </div>
    </section>
  );
};

export default Banner;
