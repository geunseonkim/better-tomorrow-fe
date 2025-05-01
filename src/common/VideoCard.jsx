import React from "react";
// import { useChannelInfoQuery } from "../hooks/useChannelInfo";
import { useTopVideoDetailQuery } from "../hooks/useTopVideoDetail";
// import { useTopVideoIdsQuery } from "../hooks/useTopVideoIds";
import { formatDistanceToNow } from "date-fns";

const VideoCard = ({ video }) => {
  //   const { data: videoIds } = useTopVideoIdsQuery();
  //   const { data: topVideoDetail } = useTopVideoDetailQuery(videoIds);
  const { data: topVideoDetail } = useTopVideoDetailQuery();

  console.log("DATA??", topVideoDetail);

  //api돌릴때 살리기
  // Exclude YouTube Shorts by filtering videos with duration > 5min
  //   const isLongEnough = (video) => {
  //     const duration = video.contentDetails.duration;
  //     const time = duration.replace("PT", "");
  //     if (!time.includes("M")) return false;
  //     const minutes = parseInt(time.split("M")[0]);
  //     return minutes >= 5;
  //   };

  //   const videoExcludeShorts = topVideoDetail?.filter(isLongEnough);

  return (
    <div>
      <div className="overflow-hidden rounded-lg w-80 h-76 border border-gray-300 flex flex-col">
        {/* api돌릴때 살리기 */}
        {/* {videoExcludeShorts?.map((video, index) => (
          <div key={index}> */}
        <div className="relative w-full h-46 overflow-hidden">
          <img
            src={video?.snippet?.thumbnails?.medium?.url}
            alt={video?.snippet.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-neutral-700 text-white w-14 flex justify-center items-center rounded">
            {video?.contentDetails?.duration
              .replace("PT", "")
              .replace("M", ":")
              .replace("S", "")}
          </div>
        </div>
        <div className="pl-3 flex flex-col justify-between flex-1 overflow-hidden">
          <div className="pt-3 text-lg">{video?.snippet?.localized?.title}</div>
          <div className="text-neutral-500">
            <div className="">{video?.snippet?.channelTitle}</div>
            <div className="flex">
              <div className="">
                {new Intl.NumberFormat("en", { notation: "compact" }).format(
                  video?.statistics?.viewCount
                )}
              </div>
              <span className="mx-1 text-neutral-500 text-lg">·</span>
              <div>
                {formatDistanceToNow(new Date(video?.snippet?.publishedAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
        </div>
        {/* api돌릴때 살리기 */}
        {/* </div>
        ))} */}
      </div>
    </div>
  );
};

export default VideoCard;
