import React from "react";

const Background = () => {
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen -z-10 overflow-hidden">
      <div
        className="absolute w-screen h-screen backdrop-blur-[2px] -z-10"
        style={{
          backgroundImage: `
linear-gradient(to right, rgba(0, 0, 0, 1) 30%, transparent),
linear-gradient(to bottom right, rgba(0, 0, 0, 1), transparent),
linear-gradient(to top right, rgba(0, 0, 0, 1), transparent),
linear-gradient(to top, rgba(0, 0, 0, 1), transparent)
`,
        }}
      ></div>
    </div>
  );
};

export default Background;
