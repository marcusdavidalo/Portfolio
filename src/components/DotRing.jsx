import useMousePosition from "../hooks/useMousePosition";
import { useState, useEffect, useCallback } from "react";

const DotRing = () => {
  const { x, y } = useMousePosition();
  const [cursorSize, setCursorSize] = useState("12px");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  const mouseDownHandler = useCallback(() => {
    setCursorSize("6px");
  }, []);

  const mouseUpHandler = useCallback(() => {
    setCursorSize("12px");
  }, []);

  const resizeHandler = useCallback(() => {
    setIsMobile(window.innerWidth <= 700);
  }, []);

  useEffect(() => {
    let resizeTimeout;
    const debouncedResizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeHandler();
      }, 100);
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("resize", debouncedResizeHandler);

    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("resize", debouncedResizeHandler);
    };
  }, [mouseDownHandler, mouseUpHandler, resizeHandler]);

  return (
    !isMobile && (
      <div
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: cursorSize,
          height: cursorSize,
          transition: "width 0.1s, height 0.1s",
        }}
        className="dot"
      ></div>
    )
  );
};

export default DotRing;
