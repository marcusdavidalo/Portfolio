import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Loader = () => {
  const bgControls = useAnimation();
  const logoControls = useAnimation();

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
        Welcome
      </motion.h1>
    </motion.div>
  );
};

export default Loader;
