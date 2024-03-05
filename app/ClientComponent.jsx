"use client";
import React, { useEffect } from "react";
import fetchToken from "./actions/fetchToken";

const ClientComponent = () => {
   return (
      <>
         <button
            onClick={fetchToken}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
         >
            Request Auth
         </button>
         <button
            onClick={skipSong(token)}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
         >
            Request Auth
         </button>
      </>
   );
};

export default ClientComponent;
