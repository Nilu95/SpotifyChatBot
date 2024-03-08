"use client";
import React, { useEffect, useTransition, useState } from "react";
import fetchToken from "./actions/fetchToken";
import skipSong from "./actions/skipSong";
import requestAuth from "./actions/requestAuth";

const ClientComponent = () => {
   const [isPending, startTransition] = useTransition();
   const [token, setToken] = useState("null");
   const [code, setCode] = useState("code");

   useEffect(() => {
      // Function to extract code from URL and call fetchToken
      const getCodeFromURL = () => {
         const urlParams = new URLSearchParams(window.location.search);
         const code = urlParams.get("code");
         if (code) {
            setCode(code);
         }
      };
      getCodeFromURL();
   }, [code]); // Empty dependency array to run only once when component mounts

   useEffect(() => {
      setToken(fetchToken(code));
   }, [code]);

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
         <button
            type="button"
            onClick={() => {
               skipSong(token);
            }}
         >
            SKIP SONG
         </button>
         <h1>Token: {token}</h1>
         <h1>Code: {code}</h1>
      </>
   );
};

export default ClientComponent;
