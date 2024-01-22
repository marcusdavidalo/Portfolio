import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/global/Logo.ico";
import { Bars3Icon, BarsArrowUpIcon } from "@heroicons/react/24/solid";

// Define the links array outside of the Header component to improve performance
const links = [
  { name: "Home", to: "/" },
  { name: "Projects", to: "/projects" },
  { name: "Services", to: "/services" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/");
  const [areRefsReady, setAreRefsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const linksRef = useRef([]);
  const node = useRef();

  // Define handleHover function outside of Header component
  const handleHover = useCallback((path) => {
    setActiveLink(path);
  }, []);

  // Function to handle window resize
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth); // Update the window width state
    if (window.innerWidth > 768) {
      setIsOpen(false);
    }
  }, []);

  // Function to handle click outside of the menu
  const handleClickOutside = useCallback((e) => {
    if (node.current.contains(e.target)) {
      // Inside click
      return;
    }
    // Outside click
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // Add the event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    setActiveLink(location.pathname);
    setAreRefsReady(true); // Trigger a re-render when the active link changes
  }, [location, windowWidth]); // Add windowWidth as a dependency here

  useEffect(() => {
    setAreRefsReady(linksRef.current.every((ref) => ref !== undefined));
  }, [activeLink, windowWidth]); // Add windowWidth as a dependency here

  useEffect(() => {
    // Add the event listeners
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Use a memoized function for generating NavLink className
  const getNavLinkClassName = useCallback(({ isActive, isPending }) => {
    if (isPending) {
      return "flex h-full justify-center w-full md:px-2 items-center hover:scale-110 hover:shadow-lg hover:shadow-white active:scale-95 active:delay-0 transition-all ease-in-out delay-100";
    } else if (isActive) {
      return "flex h-full justify-center w-full md:px-2 items-center hover:scale-110 hover:shadow-lg hover:shadow-white bg-white/5 scale-105 active:scale-90 active:delay-0 transition-all ease-in-out delay-100 pointer-events-none";
    } else {
      return "flex h-full justify-center w-full md:px-2 items-center hover:scale-110 hover:shadow-lg hover:shadow-white active:scale-95 active:delay-0 transition-all ease-in-out delay-100";
    }
  }, []);

  return (
    <nav
      ref={node}
      className={`absolute md:relative flex items-center font-bold h-screen w-screen z-50 md:backdrop-blur-[2px] md:h-[120px] justify-center text-white overflow-hidden backdrop-blur-[2px] ${
        isOpen ? "bg-black/60 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container">
        <div
          className="flex flex-col md:flex-row h-screen md:h-28 w-full justify-center md:justify-between items-center text-3xl relative"
          onMouseLeave={() => setActiveLink(location.pathname)}
        >
          <motion.img
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
            dragElastic={1}
            src={Logo}
            alt="Logo"
            className="absolute md:relative top-0 left-0 animate-float w-20 md:w-28 h-28 object-contain p-2 mx-4 hover:scale-110 hover:animate-none active:animate-none z-50"
            onMouseUp={() => navigate("/")}
          />
          <div className="md:hidden absolute top-0 right-0">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <BarsArrowUpIcon className="h-12 w-10 text-white m-10 z-50" />
              ) : (
                <>
                  <Bars3Icon className="h-10 w-10 text-white m-10 z-50" />
                  {/* <div className="h-26"></div> */}
                </>
              )}
            </button>
          </div>
          <div
            className={`md:flex h-full justify-end w-full ${
              isOpen ? "flex flex-col " : "hidden"
            }`}
          >
            {links.map((link, index) => (
              <div
                key={link.name}
                ref={(el) => (linksRef.current[index] = el)}
                onMouseEnter={() => handleHover(link.to)}
                className="flex h-full items-center px-2 text-4xl md:text-3xl"
              >
                <NavLink to={link.to} className={getNavLinkClassName}>
                  <span className="w-fit">{link.name}</span>
                </NavLink>
              </div>
            ))}
          </div>
          {areRefsReady && (
            <motion.div
              className="absolute bottom-0 h-1 bg-white"
              initial={{
                x:
                  linksRef.current[
                    links.findIndex((link) => link.to === activeLink)
                  ]?.offsetLeft ?? 0,
                width:
                  linksRef.current[
                    links.findIndex((link) => link.to === activeLink)
                  ]?.offsetWidth ?? 0,
              }}
              animate={{
                x:
                  linksRef.current[
                    links.findIndex((link) => link.to === activeLink)
                  ]?.offsetLeft ?? 0,
                width:
                  linksRef.current[
                    links.findIndex((link) => link.to === activeLink)
                  ]?.offsetWidth ?? 0,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
