import React, { useRef } from "react";
import Carousel from "../../common/Carousel";
import { useNavigate } from "react-router-dom";

const MultiCarousel = ({ onMainVideoIdReady }) => {
  const mrbeastId = "PLoSWVnSA9vG_s-XT40oPKF0iWFGw8pOp2";
  const kurzgesagtId = "PLFs4vir_WsTyRF0gggqGopQvUZR-oK_c6";
  const tedTalksId = "PLOGi5-fAu8bEGRNnASSKTvGdKx7FCURQu";

  const navigate = useNavigate();
  const navigateToRecommend = () => {
    navigate("/recommend");
  };

  const playlists = [
    { title: "MrBeast 인기 영상", id: mrbeastId },
    { title: "Kurzgesagt 과학 콘텐츠", id: kurzgesagtId },
    { title: "TED Talks 명강연", id: tedTalksId },
  ];

  const handled = useRef(false);

  const handleFirstVideoId = (videoId) => {
    if (!handled.current && onMainVideoIdReady) {
      handled.current = true;
      onMainVideoIdReady(videoId);
    }
  };

  return (
    <div className="p-5">
      <div>
        {playlists.map(({ title, id }) => (
          <div>
            <section key={id}>
              <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl sm:text-3xl font-bold pl-8">{title}</h2>
                  <div
                    className="cursor-pointer underline"
                    onClick={navigateToRecommend}
                  >
                    영상 더보기
                  </div>
                </div>
                <Carousel playlistId={id} handleFirstVideoId={handleFirstVideoId} />
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCarousel;
