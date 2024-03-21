import React, { useEffect, useTransition, useState } from "react";
import skipSong from "../actions/skipSong";

const SkipSongButton = ({ token }) => {
   const handleClick = () => {
      skipSong(token);
   };

   return (
      <button
         type="button"
         className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
         onClick={handleClick}
      >
         SKIP SONG
      </button>
   );
};

export default SkipSongButton;
