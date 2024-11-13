import { useCallback, useEffect, useRef, useState } from "react";

export const useStickyState = (offset = 16) => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        setIsSticky(rect.bottom < window.innerHeight - offset);
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
  }, [offset]);

  const resetIsSticky = useCallback(() => {
    setIsSticky(false);
  }, []);

  return { stickyRef, isSticky, resetIsSticky };
};
