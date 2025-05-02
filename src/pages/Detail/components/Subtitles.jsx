import React, { useEffect, useState, useRef } from "react";
import { useCaptionDataQuery } from "../../../hooks/useCaption";
import { IoIosPlayCircle } from "react-icons/io";

const Subtitles = ({ currentTime, setCurrentTime, player }) => {
  const videoId = "NDsO1LT_0lw";
  const { englishCaption, koreanCaption, isLoading, isError, error } =
    useCaptionDataQuery(videoId);
  const [currentSubIdx, setCurrentSubIdx] = useState("");
  const captionRefs = useRef([]);
  const containerRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const getSubByTime = () => {
    if (!englishCaption || englishCaption.length === 0) return;

    for (let i = 0; i < englishCaption.length - 1; i++) {
      const nextCaption = englishCaption[i + 1];
      if (nextCaption["start"] > currentTime) {
        if (currentSubIdx !== i) {
          setCurrentSubIdx(i);
          if (isUserScrolling) return;

          const parentElement = captionRefs?.current?.[i].parentElement; // 부모
          const captionElement = captionRefs?.current?.[i]; // 자막

          const offset = captionElement.offsetTop - parentElement.offsetTop;

          if (offset > 180) {
            parentElement.scrollTo({
              top: offset - 180,
              behavior: "smooth",
            });
          }
        }
        return;
      }
    }
  };
  const jumpTo = (startTime) => {
    setCurrentTime(Number(startTime));
    player.seekTo(Number(startTime), true);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 1000); // 1초 후 자동 스크롤 허용
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    getSubByTime();
  }, [currentTime]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div
        ref={containerRef}
        className="space-y-1 lg:max-h-[600px] max-h-[300px] overflow-y-auto sm:px-2"
      >
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
                onClick={() => jumpTo(caption["start"])}
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
