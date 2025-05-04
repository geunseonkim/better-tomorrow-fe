import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCount, formatTimeAgo } from "../utils/dataFormatUtils";

const VideoCard = ({ video }) => {
  // console.log("DDDDDD", video);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${video.videoId}`);
  };

  return (
    <div className="p-2">
      <div className="p-2 cursor-pointer" onClick={handleClick}>
        <div className="overflow-hidden rounded-lg w-full h-auto min-h-70 border border-gray-300 flex flex-col cursor-pointer hover:scale-105 transition duration-300">
          <div className="relative w-full aspect-video overflow-hidden">
            <img
              src={video?.thumbnail}
              alt={video?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-neutral-700 text-white w-14 flex justify-center items-center rounded">
              {video?.duration}
            </div>
          </div>
          <div className="px-2 flex flex-col justify-between flex-1 overflow-hidden pl-3">
            <div className="pt-2 text-sm sm:text-base"> {video?.title}</div>
            <div className="text-neutral-500">
              <div className="text-sm ">{video?.channelTitle}</div>
              <div className="flex pb-3  text-sm">
                <div>{formatCount(Number(video.viewCount))} views</div>
                <span className="mx-1 text-neutral-500">·</span>
                <div>{formatTimeAgo(video.publishedAt)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
