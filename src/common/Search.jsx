import React from "react";

const Search = () => {
  return (
    <form className="w-full max-w-xl flex gap-2 mt-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Youtube URL을 입력해주세요"
          className="input input-md bg-white/20 border-white/20 text-white placeholder:text-white/50 h-12 pr-10 w-full"
        />
      </div>
      <button
        type="submit"
        className="btn btn-neutral text-white text-sm font-medium hover:bg-neutral-800 w-24 h-12"
      >
        검색
      </button>
    </form>
  );
};

export default Search;
