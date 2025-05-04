import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "../common/Search";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// 모바일 버전 디자인 수정
// 디테일 페이지 검색창 모바일 버전 -> 위치 조정
const Header = ({ onStartClick }) => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/detail");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const navigateToRecommend = () => {
    navigate("/recommend");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="h-16 px-4 flex items-center justify-between relative">
        {/* 왼쪽: 로고 */}
        <div className="flex items-center gap-2 text-xl font-bold z-10">
          <Link to="/">SubTube</Link>
        </div>

        {/* 디테일 페이지 오른쪽 검색창 (데스크탑) */}
        {isDetailPage && (
          <div className="hidden sm:block pb-4 max-w-xl w-full pl-20">
            <Search />
          </div>
        )}

        {/* 오른쪽: 메뉴들 */}
        <div className="hidden sm:flex items-center gap-4 z-10">
          <nav className="flex items-center gap-2">
            <a
              href="#videos"
              className="text-sm font-medium px-3 py-1"
              onClick={navigateToRecommend}
            >
              추천영상
            </a>
            <a href="#features" className="text-sm font-medium px-3 py-1">
              기능
            </a>
            <a href="#how-it-works" className="text-sm font-medium px-3 py-1">
              사용방법
            </a>
          </nav>

          {!isDetailPage && (
            <button
              className="btn btn-neutral text-sm font-medium hover:bg-neutral-700 px-4 py-2"
              onClick={onStartClick}
            >
              시작하기
            </button>
          )}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="sm:hidden flex items-center gap-2 z-10">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FiMenu className="text-2xl" />
          </button>
        </div>
      </div>

      {/* 모바일: 디테일 페이지 검색창 */}
      {isDetailPage && (
        <div className="sm:hidden px-4 mb-2 mt-[-24px]">
          <Search />
        </div>
      )}

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-white boder-t border-gray-200 shadow-md z-40">
          <nav className="flex flex-col px-4 py-3 space-y-2">
            <a
              href="#videos"
              className="text-sm font-medium"
              onClick={navigateToRecommend}
            >
              추천영상
            </a>
            <a href="#features" className="text-sm font-medium">
              기능
            </a>
            <a href="#how-it-works" className="text-sm font-medium">
              사용방법
            </a>
            {!isDetailPage && (
              <button
                className="btn btn-neutral text-sm font-medium mt-2"
                onClick={() => {
                  setIsMenuOpen(false);
                  onStartClick();
                }}
              >
                시작하기
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
