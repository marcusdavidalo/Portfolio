// import "./DotRing.css";
import useMousePosition from "../hooks/useMousePosition";
import { useState, useEffect } from "react";

const DotRing = () => {
  const { x, y } = useMousePosition();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorSize, setCursorSize] = useState("8px");

  useEffect(() => {
    const mouseDownHandler = () => {
      setIsMouseDown(true);
      setCursorSize("6px");
    };
    const mouseUpHandler = () => {
      setIsMouseDown(false);
      setCursorSize("12px");
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, []);

  return (
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
  );
};

export default DotRing;
