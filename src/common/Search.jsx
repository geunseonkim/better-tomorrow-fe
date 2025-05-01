import React from "react";

// pattern="https?://(www\.)?(youtube\.com|youtu\.be)/.+" -> 유튜브 url 정규식
// JavaScript로 URL 유효성 검사 함수형 방법 고려
// url로 검색을 했는데 동영상에서 한/영 자막이 없을 경우 -> 안내 문구 및 리다이렉트 사용방법

const Search = () => {
  return (
    <form className="w-full max-w-xl flex gap-2 mt-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Youtube URL을 입력해주세요"
          className="input input-md bg-white text-white placeholder:text-gray-400 h-10 pr-10 w-full"
        />
      </div>
      <button
        type="submit"
        className="btn btn-neutral text-white text-sm font-medium hover:bg-neutral-800 w-20 h-10"
      >
        검색
      </button>
    </form>
  );
};

export default Search;
