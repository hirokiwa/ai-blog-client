import { useCallback, useEffect, useRef, useState } from "react";

export const useStickyState = (offset = 16) => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [innerHeight, setInnerHeight] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        setIsSticky(rect.bottom < innerHeight - offset);
        console.log(`rect.bottom: ${rect.bottom}`);
        console.log(
          `window.innerHeight - offset: ${window.innerHeight - offset}`
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset, innerHeight]);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
    const handleResize = () => {
      setInnerHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const resetIsSticky = useCallback(() => {
    setIsSticky(false);
  }, []);

  return { stickyRef, isSticky, resetIsSticky };
};
