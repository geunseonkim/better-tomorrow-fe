import React from "react";
import { Link } from "react-router-dom";

// 추천영상 라우터 -> /recommend
// 시작하기 버튼 -> 추천 영상의 첫번째 영상 디테일 페이지로 이동

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full  bg-white ">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex gap-2 items-center text-xl font-bold">
          <Link to="/">SubTube</Link>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <a
              href="#videos"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-2"
            >
              추천영상
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-2"
            >
              기능
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-2"
            >
              사용방법
            </a>
            <Link>
              <button className="btn btn-neutral text-sm font-medium hover:bg-neutral-700 px-4 py-2">
                시작하기
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
