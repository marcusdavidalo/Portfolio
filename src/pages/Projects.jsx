import React, { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import ProjData from "../data/projects/data.json";

const Projects = () => {
  const [projects, setProjects] = useState(ProjData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch({ ProjData });
        const data = await response.json();
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          console.log("No data in JSON file");
        }
      } catch (error) {
        console.error("Error loading JSON file:", error);
      }
    };
    fetchData();
  }, []);

  console.log(ProjData);

  useTitle("Projects");

  return (
    <div className="flex flex-wrap justify-center items-center p-4">
      {projects.map((project, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
        >
          <div className="m-4 hover:m-0 bg-black rounded-md shadow-white/25 shadow-lg overflow-hidden hover:shadow-xl hover:shadow-white hover:scale-105 hover:border-t hover:border-b-8 hover:border-x-4 hover:border-white transition-all duration-300 ease-in-out">
            <img
              src={project.images.home}
              alt={project.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-2xl mb-2">{project.name}</h2>
              <p className="text-gray-700">{project.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
