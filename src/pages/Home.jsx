import React from "react";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home");

  return (
    <>
      <div
        id="Hero-Section"
        className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen -z-10 overflow-hidden"
      >
        <div className="flex justify-start align-top items-center h-full w-screen">
          <div className="flex flex-col w-1/2 z-10 text-[#fdf6f0] h-2/5 align-top justify-between p-10">
            <h2 className="text-9xl font-bold">Marcus David Alo</h2>
            <p className="text-4xl font-semibold top-0 mt-4">
              MERN Stack Web Developer
            </p>
            <button className="mt-8 py-2 px-4 w-fit bg-white text-black text-2xl font-semibold rounded-md shadow-md hover:bg-black hover:text-white hover:shadow-white active:scale-[.90] transition-all ease-in-out">
              Contact Me
            </button>
          </div>
        </div>
      </div>
      <div id="Products"></div>
    </>
  );
};

export default Home;
