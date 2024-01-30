import React, { useEffect, useRef, useState, createRef } from "react";
import { useSpring } from "react-spring";
import { Scrollama, Step } from "react-scrollama";
import NodeData from "../data/about/tempdata.json";

const About = () => {
  const [nodes, setNodes] = useState(NodeData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch({ NodeData });
        const data = await response.json();
        if (data && data.length > 0) {
          setNodes(data);
        } else {
          console.log("No data in JSON file");
        }
      } catch (error) {
        console.error("Error loading JSON file:", error);
      }
    };
    fetchData();
  }, []);

  const stepRefs = useRef([]);
  stepRefs.current = nodes.map((_, i) => stepRefs.current[i] ?? createRef());

  const [springStyles] = useSpring(() => ({
    top: "0%",
  }));

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen overflow-x-hidden overflow-y-scroll py-20">
        <div className="w-screen flex justify-center">
          <div
            className="fixed top-0 bottom-0 w-1 bg-white h-full"
            style={springStyles}
          />
        </div>

        <Scrollama>
          {nodes.map((item, index) => (
            <Step data={index} key={item.id}>
              <div
                ref={stepRefs.current[index]}
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0
                    ? "md:flex-row-reverse text-left"
                    : "text-right"
                } w-screen h-auto `}
              >
                <div className="absolute translate-y-12 flex align-middle items-center justify-center w-screen">
                  <div className="bg-black border-4 h-4 w-4 border-white rounded-full m-2" />
                </div>
                <div className="w-full md:w-1/2 p-10 relative">
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
