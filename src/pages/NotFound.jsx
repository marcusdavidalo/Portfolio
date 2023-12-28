import React from "react";

const NotFound = () => {
  // Array of funny and witty 404 messages
  const wittyMessages = [
    "Hey, you. You're finally awake... but the page you're looking for isn't.",
    "404 Error: Page not found. Did you take an arrow to the hyperlink?",
    "Looks like the page tried to cross the border but got caught in a 404 ambush.",
    "Error 404: Page not found. Must have mistaken this for Whiterun.",
    "The page you are looking for seems to have taken an arrow to the code.",
    "404: Fus Ro Dah! The page has been shouted away.",
    "Error 404: Dragon shout malfunction. Page not found.",
    "Error 404: Page not found. It's probably off fighting dragons.",
    "Looks like the page has been banished to the Planes of Oblivion.",
    "Error 404: Page not found. Maybe it's trapped in a soul gem?",
    "404: The page is lost in the Dwemer ruins.",
    "Error 404: Page not found. It must have been pickpocketed by a Khajiit.",
    "404: The page has been consumed by Alduin, the World Eater.",
    "Error 404: Page not found. It's hiding from the Thalmor.",
    "404: The page has been shouted off the Throat of the World.",
  ];

  // Randomly select a witty message
  const randomMessage =
    wittyMessages[Math.floor(Math.random() * wittyMessages.length)];

  return (
    <div className="text-white text-7xl h-screen w-screen absolute top-0 left-0 flex justify-center align-middle items-center whitespace-nowrap">
      {randomMessage}
    </div>
  );
};

export default NotFound;
