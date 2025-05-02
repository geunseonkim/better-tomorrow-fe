import React from "react";
import Banner from "./components/Banner";
import { Link } from "react-router-dom";
import MultiCarousel from "../MultiCarousel/MultiCarousel";

const MainPage = () => {
  const features = [
    {
      step: 1,
      title: "원어 스크립트화",
      description: "Youtube 영상의 자막을 자동으로 추출하여 텍스트로 확인",
    },
    {
      step: 2,
      title: "자막 번역",
      description: "자막을 번역하여 외국어 영상도 쉽게 이해할 수 있도록 지원",
    },
    {
      step: 3,
      title: "단어별 사전과 번역 제공",
      description:
        "자막에 등장하는 단어를 클릭하여 사전 내용과 번역 예문을 통해 학습 가능",
    },
    {
      step: 4,
      title: "URL 검색",
      description: "내가 원하는 동영상 URL을 입력하여 동영상으로 학습 가능",
    },
  ];

  return (
    <div>
      <Banner />

      {/* 추천 영상 캐러셀 */}
      <section id="videos" className="w-full py-12 md:py-16">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">추천 영상</h2>
              <p className="text-md pt-2 text-gray-500">
                자막으로 더 쉽게 이해할 수 있는 영상들을 확인해보세요.
              </p>
            </div>
            <Link to="/recommend" className="flex items-center text-sm font-medium">
              모든 영상 보기 &gt;
            </Link>
          </div>
          <div>
            <MultiCarousel />
          </div>
        </div>
      </section>

      {/* 기능 설명 */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-xl bg-black px-3 py-1 text-sm text-white">
                주요 기능
              </div>
              <h2 className="text-3xl font-bold  md:text-4xl">
                영상을 더 효과적으로 활용해보세요.
              </h2>
              <p className="mt-4 max-w-[900px] md:text-xl text-gray-500">
                SubTube는 YouTube 영상의 자막을 쉽게 확인하고 활용할 수 있는 다양한
                기능을 제공합니다.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-2xl items-center gap-6 py-12 lg:grid-cols-2">
            {features.map((item, idx) => (
              <div
                key={item.step}
                className={`w-xs min-h-[180px] rounded-xl p-8 shadow-md ${
                  idx % 2 === 0 ? "bg-gray-800" : "bg-[#6e4aef]"
                }`}
              >
                <div className="text-white/40 text-5xl font-bold mb-6">
                  {item.step}
                </div>
                <div className="text-xl text-white font-semibold mb-2">
                  {item.title}
                </div>
                <p className="text-sm text-white">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사용 방법 */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold md:text-4xl">사용 방법</h2>
              <p className="max-w-[900px] text-gray-600 text-xl p-2">
                SubTube는 간단한 3단계로 YouTube 영상의 자막을 확인할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-bold p-2">시작하기</h3>
              <p className="text-gray-500 text-sm">
                보고싶은 동영상을 선택하여 <br />
                자막과 함께 시청하며 학습할 수 있습니다.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-bold p-2">YouTube URL 입력</h3>
              <p className="text-gray-500 text-sm">
                한글과 영어 자막이 있는 YouTube 영상의 URL을 입력하여 학습이
                가능합니다. <br />
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-bold p-2">자막 확인</h3>
              <p className="text-gray-500 text-sm">
                영상과 함께 자막을 확인하고, 궁금한 단어는 사전과 번역을 통해 학습할
                수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold md:text-4xl">
                지금 바로 시작하세요
              </h2>
              <p className="max-w-[900px] text-gray-500 text-sm p-2">
                YouTube 영상의 자막을 쉽게 확인하고 활용해보세요.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link to="/detail">
                <button className="btn btn-neutral px-6 hover:bg-neutral-800">
                  무료로 시작하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
