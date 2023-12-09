import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Typed from "typed.js";

const Footer = () => {
  const [visitCount, setVisitCount] = useState(0);
  const viscount = useRef(null);

  useEffect(() => {
    // Check if visitCount exists in local storage
    let visitCount = localStorage.getItem("visitCount");

    // If not, set it to 1
    if (!visitCount) {
      localStorage.setItem("visitCount", "0");
      setVisitCount(0);
    } else {
      // Set visitCount to the stored value
      setVisitCount(Number(visitCount));
    }

    const visited = new Typed(viscount.current, {
      strings: ["Times Visited", "Times Reloaded"],
      typeSpeed: 75,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      visited.destroy();
    };
  }, []);

  return (
    <footer className="absolute bottom-0 left-0 w-screen flex items-center justify-center text-white/50 h-20 overflow-hidden">
      <div className="grid grid-cols-3 text-xl w-full">
        <div>
          <p className="px-4">
            <a
              href="mailto:marcusdavidalo.work@gmail.com"
              className="underline flex items-center align-middle gap-2 transition-all ease hover:text-white"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 inline" />
              marcusdavidalo.work@gmail.com
            </a>
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>© 2023 Marcus David Alo. All rights reserved.</p>
          <div className=" text-xs font-mono">
            <span ref={viscount} />: {visitCount}
          </div>
        </div>
        <div className="flex justify-end items-center space-x-4 px-4">
          <a
            href="https://github.com/marcusdavidalo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="h-8 w-8 transition-all ease hover:text-white"
            />
          </a>
          <a
            href="https://www.facebook.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="h-8 w-8 transition-all ease hover:text-white"
            />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              className="h-8 w-8 transition-all ease hover:text-white"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
