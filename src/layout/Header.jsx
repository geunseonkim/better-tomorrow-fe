import React from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "../common/Search";

const Header = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/detail");

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="h-16 px-4 flex items-center justify-between relative">
        {/* 왼쪽: 로고 */}
        <div className="flex items-center gap-2 text-xl font-bold z-10">
          <Link to="/">SubTube</Link>
        </div>

        {/* 가운데: 검색창 (디테일 페이지에서만) */}
        {isDetailPage && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl pb-4">
            <Search />
          </div>
        )}

        {/* 오른쪽: 메뉴들 */}
        <div className="flex items-center justify-end space-x-4 z-10">
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
