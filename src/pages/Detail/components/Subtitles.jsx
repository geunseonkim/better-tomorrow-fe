import React, { useEffect, useState, useRef } from "react";
import { useCaptionDataQuery } from "../../../hooks/useCaption";
import { IoIosPlayCircle } from "react-icons/io";
import { useSanityCaptionQuery } from "../../../hooks/useSanityCaption";
import { sanity } from "../../../lib/sanityClient";

const Subtitles = ({
  currentTime,
  setCurrentTime,
  player,
  videoId,
  setSearchWord,
}) => {
  const {
    sanityEnglish,
    sanityKorean,
    sanityLoading,
    sanityIsError,
    sanityNotFound,
  } = useSanityCaptionQuery(videoId);

  const [hasFetchedFallback, setHasFetchedFallback] = useState(false);

  const shouldFetchFallback =
    !sanityLoading && sanityNotFound === true && !hasFetchedFallback;

  const { englishCaptionAPI, koreanCaptionAPI, isLoading, isError } =
    useCaptionDataQuery(videoId, {
      enabled: shouldFetchFallback,
    });

  useEffect(() => {
    const fetched =
      (englishCaptionAPI && englishCaptionAPI.length > 0) || isError;
    if (shouldFetchFallback && !isLoading && fetched) {
      setHasFetchedFallback(true); // 성공/실패 관계없이 무조건 한 번만 실행
    }
  }, [shouldFetchFallback, isLoading, englishCaptionAPI, isError]);

  //   let englishCaption = [];
  //   let koreanCaption = [];

  //   if (englishCaptionAPI?.length > 0 && koreanCaptionAPI?.length > 0) {
  //     englishCaption = englishCaptionAPI;
  //     koreanCaption = koreanCaptionAPI;
  //   } else if (sanityEnglish && sanityKorean) {
  //     englishCaption = sanityEnglish;
  //     koreanCaption = sanityKorean;
  //   }

  const [englishCaption, setEnglishCaption] = useState([]);
  const [koreanCaption, setKoreanCaption] = useState([]);

  useEffect(() => {
    if (sanityEnglish && sanityKorean) {
      setEnglishCaption(sanityEnglish);
      setKoreanCaption(sanityKorean);
    } else if (englishCaptionAPI?.length > 0 && koreanCaptionAPI?.length > 0) {
      setEnglishCaption(englishCaptionAPI);
      setKoreanCaption(koreanCaptionAPI);
    }
  }, [sanityEnglish, sanityKorean, englishCaptionAPI, koreanCaptionAPI]);

  // console.log(
  //   "englishCaption",
  //   englishCaption,
  //   koreanCaption,
  //   sanityNotFound,
  //   sanityEnglish,
  //   sanityKorean
  // );

  const finalLoading =
    sanityLoading ||
    (sanityNotFound === true && isLoading) ||
    (shouldFetchFallback && !sanityEnglish && !englishCaptionAPI);

  const finalError =
    (!sanityLoading && sanityIsError) || // sanity 자체 실패
    (!sanityLoading && sanityNotFound === true && isError) ||
    (!finalLoading && !englishCaption) || // sanity 없음 + API 실패
    (!finalLoading && englishCaption.length === 0);

  const [currentSubIdx, setCurrentSubIdx] = useState("");
  const captionRefs = useRef([]);
  const containerRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const getSubByTime = () => {
    if (!englishCaption || englishCaption.length === 0) return;

    for (let i = 0; i < englishCaption.length - 1; i++) {
      const nextCaption = englishCaption[i + 1];

      if (
        i === englishCaption.length - 2 &&
        nextCaption["start"] < currentTime
      ) {
        setCurrentSubIdx(i + 1);
        return;
      }

      if (nextCaption["start"] > currentTime) {
        if (currentSubIdx !== i) {
          setCurrentSubIdx(i);
          if (isUserScrolling) return;

          const parentElement = captionRefs?.current?.[i]?.parentElement; // 부모
          const captionElement = captionRefs?.current?.[i]; // 자막

          const offset = captionElement?.offsetTop - parentElement?.offsetTop;

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
    if (!player || !startTime) return;
    setCurrentTime(Number(startTime));
    player.seekTo(Number(startTime), true);
  };

  useEffect(() => {
    if (finalError) return;
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
  }, [finalError]);

  useEffect(() => {
    if (finalError) {
      return;
    }
    getSubByTime();
  }, [currentTime, finalError]);

  return (
    <div className="p-4">
      <div
        ref={containerRef}
        className="space-y-1 lg:max-h-[600px] lg:min-h-[500px] min-h-[250px] max-h-[350px] overflow-y-auto sm:px-2"
      >
        {finalLoading && (
          <div className="h-full flex items-center justify-center mt-10 ">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        )}
        {finalError ? (
          <div className="h-[250px] lg:h-[600px] flex items-center justify-center bg-black/10">
            <div className="rounded-lg bg-white p-3">
              자막이 존재하지 않는 영상입니다.
            </div>
          </div>
        ) : (
          <>
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
                      {(caption?.["text"] || "")
                        .split(/(\s+)/)
                        .map((word, wordIdx) => (
                          <span
                            key={wordIdx}
                            className="hover:bg-yellow-200 cursor-pointer"
                            onClick={() => setSearchWord(word)}
                          >
                            {word}
                          </span>
                        ))}
                    </div>
                    <div className="">{koreanCaption?.[index]?.["text"]}</div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Subtitles;
