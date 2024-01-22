// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import ServData from "../data/services/tempdata.json";
import Placeholder from "../assets/global/Logo.png";

// Define the Services component
const Services = () => {
  // Initialize state variables
  const [services, setServices] = useState(ServData);
  const navigate = useNavigate();

  // Fetch data from JSON file when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch({ ServData });
        const data = await response.json();
        if (data && data.length > 0) {
          setServices(data);
        } else {
          console.log("No data in JSON file");
        }
      } catch (error) {
        console.error("Error loading JSON file:", error);
      }
    };
    fetchData();
  }, []);

  // Set document title to "Services"
  useTitle("Services");

  // Render the list of service cards
  return (
    <div className="flex flex-wrap justify-center items-center">
      {services.map((service, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <div className="m-4 h-64 hover:m-0 bg-black rounded-md shadow-white/25 shadow-lg overflow-hidden hover:shadow-xl hover:shadow-white hover:scale-105 hover:border-t hover:border-b-8 hover:border-x-4 hover:border-white transition-all duration-300 ease-in-out">
            <img
              src={service.images.home ? service.images.home : Placeholder}
              alt={service.name}
              className="h-32 w-full hover:scale-110 transition-all ease-in-out object-cover"
              onClick={() => navigate(`/services/${service.name}`)}
            />
            <div className="p-4">
              <h2
                className="font-bold text-2xl mb-2"
                onClick={() => navigate(`/services/${service.name}`)}
              >
                {service.name}
              </h2>
              <p className="text-gray-700">{service.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
