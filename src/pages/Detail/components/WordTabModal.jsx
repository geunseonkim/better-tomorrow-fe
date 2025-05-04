import React, { useState, useEffect, useRef } from "react";
import { useWordDetails } from "../../../hooks/useWordDetails";
import { FaVolumeUp } from "react-icons/fa";

// const WordTabModal = ({ searchWord, to, isOpen, onClose }) => {
const WordTabModal = ({ searchWord, setSearchWord }) => {
  // const proxyUrl = "http://15.223.105.115";

  const [tab, setTab] = useState("def");
  const dialogRef = useRef(null);

  // const { translation, definition, synonymsAntonyms } = useWordDetails(
  //   searchWord || "coffee",
  //   to || "ko",
  //   proxyUrl,
  //   true
  // );

  const { definition, synonymsAntonyms } = useWordDetails(
    searchWord || "coffee",
    true
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    console.log("ddd", dialog);
    if (!dialog) return;

    if (searchWord && searchWord !== "") {
      dialog.showModal(); // 모달을 열 때
    } else {
      dialog.close(); // searchWord가 없을 때 모달을 닫기
    }
  }, [searchWord]);

  // const {
  //   searchWord: transText,
  //   isPending,
  //   isError: isTransError,
  //   error: transError,
  // } = translation;

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
      <dialog
        ref={dialogRef}
        className="modal fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {searchWord && (
          <div className="modal-box w-full sm:w-[500px] md:w-[600px] lg:w-[700px] h-[300px] overflow-y-auto">
            <div>
              <div>
                <h2 className="text-3xl font-bold">{searchWord || "coffee"}</h2>
                {/* <p className="text-md my-1 mb-3">
                  1. {transText?.translatedText}
                </p> */}
                <p className="text-xs text-gray-300 space-x-2">
                  <span>Pronunciation</span>
                  US{" "}
                  <span style={{ fontSize: "0.7rem" }}>
                    [{defData?.phonetics?.[1]?.text || "N/A"}]
                  </span>
                  GB{" "}
                  <span style={{ fontSize: "0.7rem" }}>
                    [{defData?.phonetics?.[0]?.text || "N/A"}]
                  </span>
                </p>
              </div>
              <hr className="my-3 border-t border-gray-300" />
            </div>
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
            <div className="modal-action">
              <button
                onClick={() => {
                  setSearchWord("");
                }}
                className="btn"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export default WordTabModal;
