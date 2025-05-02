import React from "react";
import Carousel from "../../common/Carousel";

const MultiCarousel = () => {
  const mrbeastId = "PLoSWVnSA9vG_s-XT40oPKF0iWFGw8pOp2";
  const kurzgesagtId = "PLFs4vir_WsTyRF0gggqGopQvUZR-oK_c6";
  const tedTalksId = "PLOGi5-fAu8bEGRNnASSKTvGdKx7FCURQu";

  const playlists = [
    { title: "MrBeast", id: mrbeastId },
    { title: "Kurzgesagt – In a Nutshell", id: kurzgesagtId },
    { title: "TED Talks", id: tedTalksId },
  ];

  return (
    <div className="space-y-10 p-5">
      {playlists.map(({ title, id }) => (
        <section key={id}>
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h2>
            <Carousel playlistId={id} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default MultiCarousel;
