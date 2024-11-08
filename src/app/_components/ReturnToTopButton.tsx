"use client";

import { useCallback, useEffect, useState } from "react";

const ReturnToTopButton = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const updateScrollY = useCallback(() => {
    setScrollY(window.scrollY);
    const scrollIsCompleted = window.scrollY < 10 && !isScrolling;
    scrollIsCompleted && setIsScrolling(false);
  }, [isScrolling]);
  
  const handleScrollToTop = useCallback(() => {
    setIsScrolling(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  useEffect(() => {
    window.addEventListener("scroll", updateScrollY);
    return () => {
      window.removeEventListener("scroll", updateScrollY);
    };
  }, []);

  return scrollY < 10 || isScrolling ? null : (
    <div className="flex-col items-center relative">
      <button
        type="button"
        onClick={handleScrollToTop}
        title="ページトップへ"
        aria-label="ページトップへ"
        className="bg-pink-600 rounded-full flex items-center justify-center p-4 shadow-xl group opacity-100 hover:opacity-80 focus:opacity-80 hover:shadow-2xl focus:shadow-2xl transition-all duration-150 ease-[cubic-bezier(.17,.67,.83,.67)] pointer-events-auto"
      >
        <div className="group-hover:-translate-y-1 group-focus:-translate-y-1 transition-all duration-75 ease-[cubic-bezier(.17,.67,.83,.67)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ReturnToTopButton;
