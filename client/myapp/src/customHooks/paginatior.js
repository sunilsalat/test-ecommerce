import { useCallback, useRef } from "react";

export const usePaginator = (currentPage, lastPage, runFun) => {
  const elemRef = useRef();

  console.log("hook calledd");

  const observer = useCallback(
    (node) => {
      if (elemRef.current) elemRef.current.disconnect();
      elemRef.current = new IntersectionObserver((entries) => {
        if (currentPage < lastPage && entries[0].isIntersecting) {
          console.log("it worked!1");
          runFun();
        }
        elemRef.current.unobserve(node);
      });
      // unobsever once function is triggred
      if (node) elemRef.current.observe(node);
    },
    [currentPage]
  );

  return { observer };
};
