import React, { useState, useEffect } from "react";
import { useWordDetails } from "../../../hooks/useWordDetails";

const WordTabModal = () => {
  const [tab, setTab] = useState("def"); // 현재 탭 상태 (기본값: 정의 탭)
  const [word, setWord] = useState("apple"); // 기본 단어는 'apple'

  // useWordDetails 훅 호출하여 필요한 데이터를 가져옴
  const { translation, definition, synonymsAntonyms } = useWordDetails(word);

  // 탭 변경 시 데이터가 업데이트될 수 있도록 enabled 상태 조정
  useEffect(() => {
    // 단어가 변경될 때마다 useWordDetails 훅에서 데이터를 가져옵니다.
  }, [word]);

  return (
    <>
      {/* 모달 오픈 버튼 */}
      <label htmlFor="dictionary_modal" className="btn">
        단어 보기
      </label>

      {/* 모달 */}
      <input type="checkbox" id="dictionary_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-full max-w-md">
          {/* 상단 단어 + 뜻 */}
          <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{word}</h3>
              <span className="text-md text-gray-600">사과 (명사)</span>
            </div>
            <hr className="my-3 border-t border-gray-300" />
          </div>

          {/* 탭 버튼 */}
          <div role="tablist" className="tabs tabs-boxed mb-3">
            <a
              role="tab"
              className={`tab ${tab === "def" ? "tab-active" : ""}`}
              onClick={() => setTab("def")}
            >
              영영 정의
            </a>
            <a
              role="tab"
              className={`tab ${tab === "ex" ? "tab-active" : ""}`}
              onClick={() => setTab("ex")}
            >
              예문
            </a>
            <a
              role="tab"
              className={`tab ${tab === "syn" ? "tab-active" : ""}`}
              onClick={() => setTab("syn")}
            >
              유의어
            </a>
          </div>

          {/* 탭 내용 */}
          <div className="text-sm text-gray-700">
            {tab === "def" && (
              <div>
                {/* 영영 정의 데이터 */}
                {definition.isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <p>{definition.data?.meanings?.[0]?.definition}</p>
                )}
              </div>
            )}
            {tab === "ex" && (
              <div>
                {/* 예문 데이터 */}
                {translation.isPending ? (
                  <p>Loading example sentences...</p>
                ) : (
                  <ul className="list-disc list-inside space-y-1">
                    <li>She eats an apple every morning.</li>
                    <li>The apple fell from the tree.</li>
                  </ul>
                )}
              </div>
            )}
            {tab === "syn" && (
              <div>
                {/* 유의어, 반의어 데이터 */}
                {synonymsAntonyms.isLoading ? (
                  <p>Loading synonyms and antonyms...</p>
                ) : (
                  <div>
                    <strong>Synonyms:</strong>{" "}
                    {synonymsAntonyms.synonyms?.join(", ")}
                    <br />
                    <strong>Antonyms:</strong>{" "}
                    {synonymsAntonyms.antonyms?.join(", ")}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 닫기 버튼 */}
          <div className="modal-action">
            <label htmlFor="dictionary_modal" className="btn">
              닫기
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordTabModal;
