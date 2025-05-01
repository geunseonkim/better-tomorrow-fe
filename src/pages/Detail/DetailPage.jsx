import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

const DetailPage = () => {
  return (
    <div className="min-h-screen py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 비디오 플레이어 */}
        <div className="lg:w-8/12">
          <div className="rounded-md overflow-hidden bg-black aspect-video relative">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
          {/* 비디오 정보 */}
          <div className="mt-4">
            <h1 className="text-xl font-bold">타이틀</h1>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full border border-gray-200"></div>
                <div>
                  <p className="font-medium">채널명</p>
                  <p className="text-sm text-muted-foreground">조회수 • 날짜</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="btn">
                  Like
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="size-[1.2em]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-md bg-gray-100/50">
              <p className="text-sm">설명 블라블라</p>
            </div>
          </div>
        </div>
        {/* 자막 */}
        <div className="lg:w-4/12 border border-gray-100 rounded-md overflow-hidden">
          <div className="bg-gray-100/50 p-2">
            <div className="flex gap-1">
              <button className="btn flex-1">
                <IoDocumentTextOutline className="h-4 w-4 mr-2" />
                자막
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2"></div>
          </div>
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
