import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { extractVideoId } from "../utils/dataFormatUtils";
import { useCheckSubtitleQuery } from "../hooks/useCheckSubtitle";
import CaptionAlertModal from "./CaptionAlertModal";

const Search = () => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [showError, setShowError] = useState(false);
  const [showCaptionModal, setShowCaptionModal] = useState(false);
  const navigate = useNavigate();

  const { data: hasSubtitle, isLoading } = useCheckSubtitleQuery(videoId);

  useEffect(() => {
    if (!isLoading && videoId) {
      if (hasSubtitle === false) {
        setShowCaptionModal(true);
        const target = document.getElementById("how-it-works");
        target?.scrollIntoView({ behavior: "smooth" });
      } else if (hasSubtitle === true) {
        navigate(`/detail/${videoId}`);
      }
    }
  }, [isLoading, hasSubtitle, videoId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const extractedId = extractVideoId(url); // 유튜브 URL에서 비디오 ID 추출

    if (extractedId) {
      setShowError(false);
      setVideoId(extractedId);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (showError) setShowError(false);
            }}
            placeholder="Youtube URL을 입력해주세요"
            className="input input-md bg-white text-black placeholder:text-gray-400 h-10 pr-10 w-full border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="btn btn-neutral text-white text-sm font-medium hover:bg-neutral-800 w-20 h-10"
        >
          검색
        </button>
      </form>

      {showError && (
        <div className="toast toast-center z-50">
          <div className="alert alert-error shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
            <span>유효한 YouTube URL을 입력해주세요.</span>
          </div>
        </div>
      )}

      {showCaptionModal && (
        <CaptionAlertModal onClose={() => setShowCaptionModal(false)} />
      )}
    </div>
  );
};

export default Search;
