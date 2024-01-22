// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import ProjData from "../data/projects/tempdata.json";
import Modal from "../components/Modal";
import Placeholder from "../assets/global/Logo.png";

// Define the Projects component
const Projects = () => {
  // Initialize state variables
  const [projects, setProjects] = useState(ProjData);
  const navigate = useNavigate();
  const { projectName } = useParams();
  const selectedProject = projects.find(
    (project) => project.name === projectName
  );

  // Fetch data from JSON file when the component mounts
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

  // Set document title to "Projects"
  useTitle("Projects");

  // Render the list of project cards
  return (
    <div className="flex flex-wrap justify-center items-center">
      {projects.map((project, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <div className="m-4 h-64 hover:m-0 bg-black rounded-md shadow-white/25 shadow-lg overflow-hidden hover:shadow-xl hover:shadow-white hover:scale-105 hover:border-t hover:border-b-8 hover:border-x-4 hover:border-white transition-all duration-300 ease-in-out">
            <img
              src={project.images.home ? project.images.home : Placeholder}
              alt={project.name}
              className="h-32 w-full hover:scale-110 transition-all ease-in-out object-cover"
              onClick={() => navigate(`/projects/${project.name}`)}
            />
            <div className="p-4">
              <h2
                className="font-bold text-2xl mb-2"
                onClick={() => navigate(`/projects/${project.name}`)}
              >
                {project.name}
              </h2>
              <p className="text-gray-700">{project.description}</p>
            </div>
          </div>
        </div>
      ))}
      {selectedProject && (
        <Modal
          project={selectedProject}
          onClose={() => navigate("/projects")}
        />
      )}
    </div>
  );
};

export default Projects;
