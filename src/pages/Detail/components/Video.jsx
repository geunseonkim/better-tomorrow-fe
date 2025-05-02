import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { useVideoDetailsQuery } from "../../../hooks/useVideoDetails";

const Video = ({
  currentTime,
  setCurrentTime,
  player,
  setPlayer,
  videoId,
  data,
}) => {
  const [extended, setExtended] = useState(false);
  const intervalRef = useRef(null);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      showinfo: 0,
      origin: window.location.origin, // 필요한 경우 origin 설정
      playsinline: 1,
    },
  };

  const onStateChange = (event) => {
    if (event.data === 1 && player) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          const time = player.getCurrentTime();
          setCurrentTime(time);
        }, 300);
      }
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="lg:w-8/12">
      <div className="sticky top-16 z-10 lg:static">
        <div className="rounded-md overflow-hidden bg-black aspect-video relative">
          <YouTube
            videoId={videoId}
            className="absolute inset-0 w-full h-full "
            opts={opts}
            onReady={(event) => {
              setPlayer(event.target);
            }}
            onStateChange={onStateChange}
          />
        </div>
      </div>
      {/* 비디오 정보 */}

      <div className="mt-4">
        <h1 className="text-xl font-bold">{data[0]?.title} </h1>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full border border-gray-200"></div>
            <div>
              <p className="font-medium">{data[0]?.channelTitle}</p>
              <p className="text-sm text-muted-foreground">
                {Number(data[0]?.viewCount).toLocaleString()} 조회수 •{" "}
                {data[0]?.publishedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn">
              Like
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="size-[1.2em]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-md bg-gray-100/50">
          <p
            className={`text-sm whitespace-pre-wrap ${
              extended ? "" : "max-h-[130px] overflow-hidden line-clamp-3"
            }`}
          >
            {data[0]?.description}
          </p>
          <button
            className="text-sm text-gray-500"
            onClick={() => setExtended(!extended)}
          >
            {extended ? "접기" : "더보기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Video;
