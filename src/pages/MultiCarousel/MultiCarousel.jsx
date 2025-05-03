import React, { useRef } from "react";
import Carousel from "../../common/Carousel";

const MultiCarousel = ({ onMainVideoIdReady }) => {
  const mrbeastId = "PLoSWVnSA9vG_s-XT40oPKF0iWFGw8pOp2";
  const kurzgesagtId = "PLFs4vir_WsTyRF0gggqGopQvUZR-oK_c6";
  const tedTalksId = "PLOGi5-fAu8bEGRNnASSKTvGdKx7FCURQu";

  const playlists = [
    { title: "미스터 비스트의 인기 영상을 확인해보세요!", id: mrbeastId },
    { title: "유용한 과학 채널 Kurzgesagt – In a Nutshell", id: kurzgesagtId },
    { title: "TED Talks 유명한 강연과 학습해보세요.", id: tedTalksId },
  ];

  const handled = useRef(false);

  const handleFirstVideoId = (videoId) => {
    if (!handled.current && onMainVideoIdReady) {
      handled.current = true;
      onMainVideoIdReady(videoId);
    }
  };

  return (
    <div className="space-y-10 p-5">
      {playlists.map(({ title, id }) => (
        <section key={id}>
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h2>
            <Carousel playlistId={id} handleFirstVideoId={handleFirstVideoId} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default MultiCarousel;
