"use client";
import React, { useEffect, useTransition, useState } from "react";
import fetchToken from "./actions/fetchToken";
import skipSong from "./actions/skipSong";
import requestAuth from "./actions/requestAuth";

const ClientComponent = () => {
   const [isPending, startTransition] = useTransition();
   const [token, setToken] = useState(null);

   useEffect(() => {
      // Function to extract code from URL and call fetchToken
      const getCodeFromURL = () => {
         const urlParams = new URLSearchParams(window.location.search);
         const code = urlParams.get("code");
         if (code) {
            // If code exists in the URL, fetch token
            startTransition(() => {
               fetchToken(code)
                  .then((token) => {
                     setToken(token);
                  })
                  .catch((error) => {
                     console.error("Error fetching token:", error);
                  });
            });
         }
      };

      // Call the function when component mounts
      getCodeFromURL();
   }, []); // Empty dependency array to run only once when component mounts

   function onAuthClick() {
      startTransition(() => {
         requestAuth();
      });
   }

   return (
      <>
         <button
            type="button"
            onClick={() => {
               onAuthClick();
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
         >
            Request Auth
         </button>
         <h1>Token: {token}</h1>
      </>
   );
};

export default ClientComponent;
