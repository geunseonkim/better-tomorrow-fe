import React, { useState, useEffect, useRef } from "react";
import { useWordDetails } from "../../../hooks/useWordDetails";
import { FaVolumeUp } from "react-icons/fa";

const WordTabModal = ({ searchWord, setSearchWord }) => {
  // const proxyUrl = "http://34.143.143.61";

  const [tab, setTab] = useState("def");

  const { translation, definition, synonymsAntonyms } = useWordDetails(
    searchWord || "coffee",
    "ko",
    true
  );

  // const { definition, synonymsAntonyms } = useWordDetails(
  //   searchWord || "coffee",
  //   true
  // );

  const {
    text: transText,
    isPending,
    isError: isTransError,
    error: transError,
  } = translation;

  const {
    data: defData,
    isLoading: isDefLoading,
    isError: isDefError,
    error: DefError,
  } = definition;

  const {
    synonyms,
    antonyms,
    isLoading: isSynAntLoading,
    isError: isSynAntError,
    error: SynAntError,
  } = synonymsAntonyms;

  if (isDefLoading || isSynAntLoading) return <p>로딩중</p>;
  if (isDefError || isSynAntError)
    return <p>"error": {DefError?.message || SynAntError?.message}</p>;

  if (!defData) {
    return <p>이 단어의 데이터가 존재하지 않습니다.</p>;
  }

  const usAudio = defData?.phonetics?.[1]?.audio;
  const gbAudio = defData?.phonetics?.[0]?.audio;
  const playAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <>
      <input
        type="checkbox"
        id="word-modal-toggle"
        className="modal-toggle"
        checked={!!searchWord}
        onChange={() => setSearchWord("")}
      />

      <div className="modal" onClick={() => setSearchWord("")}>
        <div
          className="modal-box px-8 w-full sm:w-[500px] md:w-[600px] lg:w-[700px] h-[400px] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-3xl font-bold">
            {searchWord.replace(/[.,!?]$/, "") || "coffee"}
          </h2>
          <p className="text-md my-2 mb-3">
            1. {transText?.translatedText.replace(/[.,!?]$/, "")}
          </p>
          <div className="text-xs text-gray-500 mb-3">
            Pronunciation:&nbsp; UK{" "}
            <span style={{ fontSize: "0.7rem" }}>
              [{defData?.phonetics?.[1]?.text || "N/A"}]
            </span>
            &nbsp; US{" "}
            <span style={{ fontSize: "0.7rem" }}>
              [{defData?.phonetics?.[0]?.text || "N/A"}]
            </span>
          </div>
          <div className="my-3 flex space-x-2">
            {defData?.phonetics?.map((phonetic, i) => {
              if (!phonetic.audio) return null;
              const isUS = phonetic.audio.includes("us");
              const isUK = phonetic.audio.includes("uk");
              const country = isUS ? "US" : isUK ? "UK" : "";
              const audioColor = isUS
                ? "bg-blue-500"
                : isUK
                ? "bg-gray-500"
                : "bg-green-500";
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between w-14 h-6 rounded-full ${audioColor} text-white cursor-pointer px-2`}
                  onClick={() => playAudio(phonetic.audio)}
                >
                  <FaVolumeUp size={16} />
                  <span className="text-xs">{country}</span>
                </div>
              );
            })}
          </div>
          <div role="tablist" className="tabs tabs-border mb-5">
            <a
              className={`tab ${tab === "def" ? "tab-active" : ""}`}
              onClick={() => setTab("def")}
            >
              영영
            </a>
            <a
              className={`tab ${tab === "exp" ? "tab-active" : ""}`}
              onClick={() => setTab("exp")}
            >
              예문
            </a>
            <a
              className={`tab ${tab === "synAnt" ? "tab-active" : ""}`}
              onClick={() => setTab("synAnt")}
            >
              유의어/반의어
            </a>
          </div>
          {tab === "def" && (
            <div className="space-y-4">
              {defData.meanings.map((meaning, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-xl text-blue-700 mb-3">
                    {meaning.partOfSpeech}
                  </h3>
                  <ul className="list-decimal ml-5 space-y-3">
                    {meaning.definitions.map((def, i) => (
                      <li key={i} className="text-sm">
                        {def.definition}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {tab === "exp" && (
            <div className="space-y-4">
              {defData.meanings
                .filter((meaning) =>
                  meaning.definitions.some((def) => def.example)
                )
                .map((meaning, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-xl text-blue-700 mb-3">
                      {meaning.partOfSpeech}
                    </h3>
                    <ul className="list-decimal ml-5 space-y-3">
                      {meaning.definitions
                        .filter((def) => def.example)
                        .map((def, i) => (
                          <li key={i} className="text-sm">
                            {def.example}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
          {tab === "synAnt" && (
            <div className="space-y-4">
              {defData.meanings
                .filter(
                  (meaning) =>
                    meaning.synonyms.length > 0 || meaning.antonyms.length > 0
                ) // 유의어나 반의어가 있을 경우만 필터링
                .map((meaning, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-xl text-blue-700 mb-3">
                      {meaning.partOfSpeech}
                    </h3>
                    <div className="text-sm space-y-3 ml-3">
                      {meaning.synonyms.length > 0 && (
                        <p>유의어: {meaning.synonyms.join(", ")}</p>
                      )}
                      {meaning.antonyms.length > 0 && (
                        <p>반의어: {meaning.antonyms.join(", ")}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="modal-action">
            <button onClick={() => setSearchWord("")} className="btn">
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordTabModal;
