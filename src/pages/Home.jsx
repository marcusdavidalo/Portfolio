import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { motion } from "framer-motion";
import Me from "../assets/home/Me3.png";
import Typed from "typed.js";

const Home = () => {
  useTitle("Home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const name = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const head = new Typed(name.current, {
      strings: [
        "Marcus David Alo",
        "Full-Stack Web Developer",
        "MERN Stack Developer",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1500,
      // startDelay: 500,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      head.destroy();
    };
  }, []);

  return (
    <>
      <div
        id="Hero-Section"
        className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen -z-10 overflow-hidden"
      >
        <div className="flex justify-start align-top items-center h-full w-screen">
          <div className="absolute flex flex-col w-full md:w-2/3 lg:w-1/2 z-10 text-[#fdf6f0] h-screen align-top justify-center px-5 py-20 sm:p-10">
            <motion.h2
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
              dragElastic={1}
              className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-bold whitespace-nowrap"
            >
              <span ref={name} />
            </motion.h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold mt-8">
              Hi there, I’m a full stack web developer who loves the MERN stack.
              I create awesome web apps with MongoDB, Express.js, React.js, and
              Node.js.
            </p>
            <Link
              to="/contact"
              className="mt-10 py-2 px-4 w-fit bg-white text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold rounded-md shadow-md hover:bg-black hover:text-white hover:shadow-white active:scale-[.90] transition-all ease-in-out cursor-none"
            >
              Contact Me
            </Link>
          </div>
        </div>
        <div
          className="absolute flex justify-end align-top items-center w-screen"
          style={{
            transform: `translate(${mousePosition.x / -200}px, ${
              mousePosition.y / -200
            }px)`,
          }}
        >
          <Link
            to="/about"
            title="If you click me this will lead you to the about page"
            className="cursor-default"
          >
            <img
              src={Me}
              className="h-screen object-cover scale-105"
              alt="me"
            />
          </Link>
          <div className="absolute w-full h-full bg-gradient-to-tr from-black from-35% via-transparent to-transparent object-cover scale-125 pointer-events-none"></div>
          <div className="absolute w-full h-full bg-gradient-to-b from-black via-transparent to-transparent object-cover scale-125 pointer-events-none"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
