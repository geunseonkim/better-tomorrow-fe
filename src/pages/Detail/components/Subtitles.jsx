import React, { useEffect, useState, useRef } from "react";
import { useCaptionDataQuery } from "../../../hooks/useCaption";
import { IoIosPlayCircle } from "react-icons/io";

const Subtitles = ({ currentTime, setCurrentTime, player }) => {
  const videoId = "NDsO1LT_0lw";
  const { englishCaption, koreanCaption, isLoading, isError, error } =
    useCaptionDataQuery(videoId);
  const [currentSubIdx, setCurrentSubIdx] = useState("");
  const captionRefs = useRef([]);

  const getSubByTime = () => {
    if (!englishCaption || englishCaption.length === 0) return;
    for (let i = 0; i < englishCaption.length - 1; i++) {
      const caption = englishCaption[i + 1];
      if (caption["start"] > currentTime) {
        const index = i;
        if (currentSubIdx !== index) setCurrentSubIdx(index);
        return;
      }
    }
  };
  const test = (startTime) => {
    setCurrentTime(Number(startTime));
    player.seekTo(Number(startTime), true);
  };
  useEffect(() => {
    getSubByTime();
    if (captionRefs.current[currentSubIdx]) {
      captionRefs.current[currentSubIdx].scrollIntoView({
        behavior: "smooth", // 부드러운 스크롤
        block: "center", // 가운데 정렬 (또는 "start", "end")
      });
    }
  }, [currentTime]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="space-y-1 lg:max-h-[600px] max-h-[300px] overflow-y-auto sm:px-2">
        {englishCaption &&
          koreanCaption &&
          englishCaption.map((caption, index) => (
            <div
              key={index}
              ref={(el) => (captionRefs.current[index] = el)}
              className={`group flex items-center gap-2 rounded-md p-2 bg-gray-200 mx-2 lg:mt-2 ${
                currentSubIdx === index ? "bg-gray-400" : ""
              }`}
            >
              <IoIosPlayCircle
                className={`w-6 h-6 text-purple-500 opacity-0 group-hover:opacity-100 ${
                  currentSubIdx === index ? "opacity-100" : ""
                }`}
                onClick={() => test(caption["start"])}
              />
              <div className="flex flex-col max-w-[90%] sm:text-base text-sm">
                <div>
                  {caption?.["text"].split(/(\s+)/).map((word, wordIdx) => (
                    <>
                      <span key={wordIdx} className="hover:bg-yellow-200">
                        {word}
                      </span>{" "}
                    </>
                  ))}
                </div>
                <div className="">{koreanCaption[index]["text"]}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Subtitles;
