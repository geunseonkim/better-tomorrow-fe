import React from "react";
import { Link } from "react-router-dom";
Link;

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="flex gap-2 items-center text-lg font-semibold">
        <span>SubTube</span>
      </div>

      <p className="text-xs text-center sm:ml-auto">
        &copy; {new Date().getFullYear()} SubTube. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4">
          이용약관
        </Link>
        <Link className="text-xs hover:underline underline-offset-4">
          개인정보처리방침
        </Link>
        <Link className="text-xs hover:underline underline-offset-4">
          문의하기
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
