import React, { useState } from "react";
import Video from "./components/Video";
import Subtitles from "./components/Subtitles";
import { IoDocumentTextOutline } from "react-icons/io5";

const DetailPage = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState(null);

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 비디오 플레이어 */}
        <Video
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          player={player}
          setPlayer={setPlayer}
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
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            player={player}
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
      </div>
    </div>
  );
};

export default DetailPage;

// import React from "react";
// import { usePlaylistVideosQuery } from "../../hooks/usePlaylistVideos";
// import { useVideoDetailsQuery } from "../../hooks/useVideoDetails";
// import { videoDataToString } from "../../utils/dataFormatUtils";

// const DetailPage = () => {
//   const { data: playlist, isLoading: playlistLoading } =
//     usePlaylistVideosQuery();

//   const {
//     data: videoDetails,
//     isLoading: detailLoading,
//     isError,
//     error,
//   } = useVideoDetailsQuery(videoDataToString(playlist));

//   const handleClick = (data) => {
//     console.log(data);
//   };

//   if (playlistLoading || detailLoading) return <div>Loading...</div>;
//   if (isError) {
//     console.log(error);
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={() => handleClick(playlist)}
//       >
//         get playlist
//       </button>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={() => handleClick(videoDetails)}
//       >
//         get video details
//       </button>
//     </div>
//   );
// };

// export default DetailPage;
