import useMousePosition from "../hooks/useMousePosition";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const DotRing = () => {
  const { x, y } = useMousePosition();
  const [cursorSize, setCursorSize] = useState("12px");
  const [ringSize, setRingSize] = useState("20px");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const updateSizes = (cursor, ring) => {
    setCursorSize(cursor);
    setRingSize(ring);
  };

  const checkMobile = debounce(
    () => setIsMobile(window.innerWidth <= 768),
    100
  );

  useEffect(() => {
    const mouseDownHandler = () => updateSizes("6px", "35px");
    const mouseUpHandler = () => updateSizes("12px", "20px");
    const buttonHoverHandler = (event) => {
      if (event.target.matches('a, button, [role="button"]')) {
        setRingSize(event.type === "mouseover" ? "25px" : "20px");
      }
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("resize", checkMobile);
    document.addEventListener("mouseover", buttonHoverHandler);
    document.addEventListener("mouseout", buttonHoverHandler);

    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mouseover", buttonHoverHandler);
      document.removeEventListener("mouseout", buttonHoverHandler);
    };
  }, [checkMobile]);

  return (
    !isMobile && (
      <>
        <div
          style={{
            left: `${x}px`,
            top: `${y}px`,
            width: cursorSize,
            height: cursorSize,
            transition: "width 0.25s, height 0.05s",
          }}
          className="dot"
        ></div>
        <div
          style={{
            left: `${x}px`,
            top: `${y}px`,
            width: ringSize,
            height: ringSize,
            border: "2px solid white",
            borderRadius: "100%",
            transition: "width 0.05s, height 0.25s",
          }}
          className="ring"
        ></div>
      </>
    )
  );
};

export default DotRing;
