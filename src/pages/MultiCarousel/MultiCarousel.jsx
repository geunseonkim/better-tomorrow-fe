import React, { useRef } from "react";
import Carousel from "../../common/Carousel";

const MultiCarousel = ({ onMainVideoIdReady }) => {
  const mrbeastId = "PLajhkzV2ZQSlOwJMhGYNUi9qck3YBGvMx";
  const kurzgesagtId = "PLajhkzV2ZQSkzI9BM9qmlo3-mP0Ydxjwn";
  const tedTalksId = "PLajhkzV2ZQSk0lHEEnAyNiLSYL8hxqSPB";

  const playlists = [
    { title: "MrBeast 인기 영상", id: mrbeastId },
    { title: "Kurzgesagt 과학 콘텐츠", id: kurzgesagtId },
    { title: "TED Talks 명강연", id: tedTalksId },
    // { title: "내 재생목록", id: "PLajhkzV2ZQSnWuPgDvItFs7nOPiA4sx-s" },
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
          <div key={id}>
            <section>
              <div className="max-w-[1400px] mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold pl-8">{title}</h2>
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
