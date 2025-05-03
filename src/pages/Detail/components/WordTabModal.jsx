import React, { useState } from "react";
import { useWordDetails } from "../../../hooks/useWordDetails";
import { FaVolumeUp } from "react-icons/fa";

const WordTabModal = ({ text, to }) => {
  const proxyUrl = "http://15.223.105.115";

  const [tab, setTab] = useState("def");
  const { translation, definition, synonymsAntonyms } = useWordDetails(
    text || "coffee",
    to || "ko",
    proxyUrl,
    true
    // enabled: isModalOpen,  // 모달 열리면 데이터를 가져옴
  );

  //trans
  const {
    text: transText,
    isPending,
    isError: isTransError,
    error: transError,
  } = translation;

  //def
  const {
    data: defData,
    isLoading: isDefLoading,
    isError: isDefError,
    error: DefError,
  } = definition;

  //synAnt
  const {
    synonyms,
    antonyms,
    isLoading: isSynAntLoading,
    isError: isSynAntError,
    error: SynAntError,
  } = synonymsAntonyms;

  //loading, error
  if (isPending || isDefLoading || isSynAntLoading) return <p>로딩중</p>;
  if (isTransError || isDefError || isSynAntError)
    return (
      <p>
        "error": {transError.message || DefError.message || SynAntError.message}
      </p>
    );

  //no data
  if (!transText || !defData) {
    return <p>이 단어의 데이터가 존재하지 않습니다.</p>;
  }

  //audio
  const usAudio = defData?.phonetics?.[1]?.audio;
  const gbAudio = defData?.phonetics?.[0]?.audio;
  const playAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  // console.log("transText", transText);
  console.log("defData", defData);
  console.log("synonyms", synonyms, "antonyms", antonyms);

  return (
    <>
      {/* 모달창 열기 */}
      <label htmlFor="dictionary-modal">
        <span className="cursor-pointer">{text || "coffee"}</span>
      </label>

      {/* 모달창 */}
      <input type="checkbox" id="dictionary-modal" className="modal-toggle" />
      <div className="modal">
        {/* <div className="modal-box w-full max-w-xl h-[100px] overflow-y-auto"> */}
        {/* <div className="modal-box w-[500px] h-[300px] overflow-y-auto"> */}
        <div className="modal-box w-full sm:w-[500px] md:w-[600px] lg:w-[700px] h-[300px] overflow-y-auto">
          {/* 단어 + 뜻 */}
          <div>
            <div>
              <h2 className="text-3xl font-bold">{text || "coffee"}</h2>
              <p className="text-md my-1 mb-3">
                1. {transText?.translatedText}
              </p>
              <p className="text-xs text-gray-300 space-x-2">
                <span>Pronunciation</span>
                US{" "}
                <span style={{ fontSize: "0.7rem" }}>
                  [{defData?.phonetics?.[1].text || "N/A"}]
                </span>
                GB{" "}
                <span style={{ fontSize: "0.7rem" }}>
                  [{defData?.phonetics?.[0].text || "N/A"}]
                </span>
              </p>
            </div>
            <hr className="my-3 border-t border-gray-300" />
          </div>

          {/* 오디오 */}
          <div className="my-3 flex space-x-2">
            {defData?.phonetics?.map((phonetic, i) => {
              if (phonetic.audio) {
                const isUS = phonetic.audio.includes("us");
                const isUK = phonetic.audio.includes("uk");

                let country = "";
                let audioColor = "";

                if (isUS) {
                  country = "US";
                  audioColor = "bg-blue-500";
                } else if (isUK) {
                  country = "UK";
                  audioColor = "bg-gray-500";
                } else {
                  country = "";
                  audioColor = "bg-green-500";
                }
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
              }

              return null;
            })}
          </div>

          {/* 탭 카테고리 */}
          <div role="tablist" className="tabs tabs-border mb-5">
            <a
              role="tab"
              className={`tab ${tab === "def" ? "tab-active" : ""}`}
              onClick={() => setTab("def")}
            >
              영영
            </a>
            <a
              role="tab"
              className={`tab ${tab === "exp" ? "tab-active" : ""}`}
              onClick={() => setTab("exp")}
            >
              예문
            </a>
            <a
              role="tab"
              className={`tab ${tab === "synAnt" ? "tab-active" : ""}`}
              onClick={() => setTab("synAnt")}
            >
              유의어/반의어
            </a>
          </div>

          {/* 탭 내용 */}
          <div>
            {tab === "def" && (
              <div className="space-y-4">
                {defData.meanings.map((meaning, inx) => (
                  <div key={inx}>
                    <h3 className="font-bold text-lg text-blue-700">
                      {meaning.partOfSpeech}
                    </h3>
                    <ul className="list-decimal ml-5 space-y-2">
                      {meaning.definitions.map((def, inx) => (
                        <li key={inx}>
                          <p className="text-sm">{def.definition}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {tab === "exp" && (
              <div className="space-y-4">
                {defData.meanings.map((meaning, inx) => (
                  <div key={inx}>
                    <h3 className="font-bold text-lg text-blue-700">
                      {meaning.partOfSpeech}
                    </h3>
                    <ul className="list-decimal ml-5 space-y-2">
                      {meaning.definitions
                        .filter((def) => def.example)
                        .map((def, inx) => (
                          // <li key={inx} className="text-sm text-gray-700">
                          <li key={inx} className="text-sm">
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
                {defData.meanings.map((meaning, inx) => (
                  <div key={inx}>
                    <h3 className="font-bold text-lg text-blue-700">
                      {meaning.partOfSpeech}
                    </h3>
                    <div className="text-sm space-y-1 ml-3">
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
          </div>

          {/* 모달창 닫기 */}
          <div className="modal-action">
            <label htmlFor="dictionary-modal" className="btn">
              닫기
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordTabModal;
