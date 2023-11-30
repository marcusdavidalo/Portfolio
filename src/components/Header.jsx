import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/global/Logo.ico";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/");
  const [areRefsReady, setAreRefsReady] = useState(false);
  const linksRef = useRef([]);

  const links = [
    { name: "Home", to: "/" },
    { name: "Projects", to: "/projects" },
    { name: "Gallery", to: "/gallery" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const handleHover = (path) => {
    setActiveLink(path);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    setAreRefsReady(linksRef.current.every((ref) => ref !== undefined));
  }, []);

  return (
    <nav className="flex items-center font-bold w-screen justify-center text-white overflow-hidden">
      <div className="container">
        <div
          className="flex h-28 w-full justify-between items-center text-3xl relative"
          onMouseLeave={() => setActiveLink(location.pathname)}
        >
          <motion.img
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
            dragElastic={1}
            src={Logo}
            alt="Logo"
            className="w-28 h-28 p-2 mx-4 hover:scale-110 hover:animate-none hover:cursor-pointer active:cursor-grabbing transition-all "
            onMouseUp={() => navigate("/")}
          />
          {links.map((link, index) => (
            <div
              ref={(el) => (linksRef.current[index] = el)}
              onMouseEnter={() => handleHover(link.to)}
              className="flex h-full items-center px-2"
            >
              <NavLink
                to={link.to}
                className="flex h-full px-2 items-center hover:scale-110 hover:shadow-lg hover:shadow-white active:scale-95 active:delay-0 transition-all ease delay-100"
              >
                <span className="w-fit">{link.name}</span>
              </NavLink>
            </div>
          ))}
          {areRefsReady && (
            <motion.div
              className="absolute bottom-0 h-1 bg-white"
              initial={false}
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
