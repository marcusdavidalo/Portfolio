import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";
import { Scrollama, Step } from "react-scrollama";

// Sample data
const data = [
  {
    id: 1,
    title: "The Journey of Marcus David Alo",
    content:
      "Welcome to my journey! I'm Marcus, a full stack web developer specializing in the MERN stack. Let me take you through my adventure in the world of web development.",
  },
  {
    id: 2,
    title: "From Novice to Full-Stack Web Developer",
    content:
      "It all started with a simple 'Hello, World!' in HTML. From there, I dove into JavaScript, learning the ins and outs of the language and its powerful frameworks like React.js.",
  },
  {
    id: 3,
    title: "Title Here",
    content: "Content Here",
  },
  {
    id: 4,
    title: "Title Here",
    content: "Content Here",
  },
  // More data here... this is to be replaced with a proper backend in the future
];

const About = () => {
  const stepRefs = useRef([]);
  stepRefs.current = data.map(
    (_, i) => stepRefs.current[i] ?? React.createRef()
  );

  const [springStyles, setSpring] = useSpring(() => ({
    top: "0%",
  }));

  const onStepEnter = ({ data }) => {
    const top = `${data * 100}%`;
    setSpring({ top });
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen overflow-auto py-20 -z-10">
        <div
          className="fixed left-1/2 right-1/2 top-0 bottom-0 w-1 bg-white h-full"
          style={springStyles}
        />
        <Scrollama onStepEnter={onStepEnter} offset={0.5}>
          {data.map((item, index) => (
            <Step data={index} key={item.id}>
              <div
                ref={stepRefs.current[index]}
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0
                    ? "md:flex-row-reverse text-left"
                    : "text-right"
                } w-full h-2/4 `}
              >
                <div className="absolute right-1/2 left-1/2 bg-black translate-y-12 border-4 border-white rounded-full h-[18px] w-[18px]" />
                <div className="w-full md:w-1/2 p-10 relative">
                  {/* this div is now always displayed at the center of the screen */}
                  <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                  <p className="text-xl">{item.content}</p>
                </div>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </>
  );
};

export default About;
