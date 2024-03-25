import React, { useEffect, useTransition, useState } from "react";
import togglePausePlay from "../actions/togglePausePlay";
import { FaPause, FaPlay } from "react-icons/fa";

const PausePlayButton = ({ token }) => {
   const [isPaused, setIsPaused] = useState(false);

   const handleClick = () => {
      // Update isPaused state before calling togglePausePlay
      setIsPaused(!isPaused);
      togglePausePlay(token);
   };

   return (
      <button
         type="button"
         className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
         onClick={handleClick}
      >
         {isPaused ? <FaPlay /> : <FaPause />}
      </button>
   );
};

export default PausePlayButton;
