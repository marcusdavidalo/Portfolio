import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const Loader = () => {
  const bgControls = useAnimation();
  const logoControls = useAnimation();
  const [visitCount, setVisitCount] = useState(0);

  // This useEffect runs once when the component mounts
  useEffect(() => {
    // Check if visitCount exists in local storage
    let visitCount = localStorage.getItem("visitCount");

    // If not, set it to 1
    if (!visitCount) {
      localStorage.setItem("visitCount", "0");
      setVisitCount(0);
    } else {
      // Set visitCount to the stored value
      setVisitCount(Number(visitCount));
    }
  }, []);

  useEffect(() => {
    const sequence = async () => {
      await logoControls.start({ filter: "blur(0px)", opacity: 1 });
      await logoControls.start({
        filter: "blur(5px)",
        transition: { duration: 0.25, delay: 0.25 },
      });
      await logoControls.start({ opacity: 0, transition: { duration: 0.25 } });
      await bgControls.start({ filter: "blur(5px)", opacity: 1 });
      await bgControls.start({ opacity: 0, transition: { duration: 0.25 } });
    };
    sequence();
  }, [bgControls, logoControls]);

  // This useEffect runs when the component unmounts
  useEffect(() => {
    return () => {
      // Increment visitCount by 1
      let visitCount = Number(localStorage.getItem("visitCount")) + 1;
      localStorage.setItem("visitCount", visitCount.toString());
    };
  }, []);

  return (
    <motion.div
      initial={{ filter: "blur(0px)", opacity: 1 }}
      animate={bgControls}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full bg-black text-white flex items-center justify-center pointer-events-none z-[9999]"
    >
      <div
        className="absolute w-screen h-screen backdrop-blur-[10px] -z-10"
        style={{
          backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 1) 30%, transparent),
    linear-gradient(to bottom right, rgba(0, 0, 0, 1), transparent),
    linear-gradient(to top right, rgba(0, 0, 0, 1), transparent),
    linear-gradient(to top, rgba(0, 0, 0, 1), transparent)
  `,
        }}
      ></div>
      <motion.h1
        initial={{ filter: "blur(0px)", opacity: 1 }}
        animate={logoControls}
        exit={{ opacity: 0 }}
        className="text-4xl font-semibold"
      >
        Welcome!
      </motion.h1>
      <motion.span
        initial={{ filter: "blur(0px)", opacity: 1 }}
        animate={logoControls}
        exit={{ opacity: 0 }}
        className="text-lg font-mono absolute w-screen h-screen top-0 left-0"
      >
        {visitCount <= 1 ? "" : `Times Visited: ${visitCount}`}
      </motion.span>
    </motion.div>
  );
};

export default Loader;
