"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./returnToTopButton.module.css";
import { useStickyState } from "./useSticky";

const ReturnToTopButton = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const { stickyRef, isSticky, resetIsSticky } = useStickyState(16);

  const displayButton = useMemo(
    () => !(scrollY < 10 || isScrolling),
    [scrollY, isScrolling]
  );
  const [buttonResizeAnimation, setButtonResizeAnimation] = useState<
    "enlarge" | "minimize" | null
  >(null);

  useEffect(() => {
    setButtonResizeAnimation((previousValue) => {
      if (!displayButton) return null;
      const enlarge = isSticky;
      const minimize = previousValue === "enlarge" && !isSticky;
      const newValue = enlarge ? "enlarge" : minimize ? "minimize" : null;
      return newValue;
    });
  }, [isSticky, displayButton]);

  const updateScrollY = useCallback(() => {
    setScrollY(window.scrollY);
    const scrollIsCompleted = window.scrollY < 10 && !isScrolling;
    scrollIsCompleted && setIsScrolling(false);
    scrollIsCompleted && resetIsSticky();
  }, [isScrolling, resetIsSticky]);

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

  return displayButton ? (
    <div className="flex-col items-center relative" ref={stickyRef}>
      <button
        type="button"
        onClick={handleScrollToTop}
        title="ページトップへ"
        aria-label="ページトップへ"
        className={`bg-pink-600 rounded-full flex items-center justify-start p-4 shadow-xl group opacity-100 hover:opacity-80 focus:opacity-80 hover:shadow-2xl focus:shadow-2xl transition-all duration-150 ease-[cubic-bezier(.17,.67,.83,.67)] pointer-events-auto overflow-hidden ${
          styles.frameInFromBottom
        } ${
          buttonResizeAnimation === "enlarge"
            ? styles.enlargeButton
            : buttonResizeAnimation === "minimize"
            ? styles.minimizeButton
            : "w-14"
        }`}
      >
        <div className="flex gap-1 items-center">
          <svg
            className="group-hover:-translate-y-1 group-focus:-translate-y-1 transition-all duration-75 ease-[cubic-bezier(.17,.67,.83,.67)]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <title>arrow up</title>
            <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
          </svg>
          <p
            className={`font-semibold ${
              isSticky ? styles.franeInButtonText : styles.franeOutButtonText
            }`}
          >
            TOP
          </p>
        </div>
      </button>
    </div>
  ) : null;
};

export default ReturnToTopButton;
