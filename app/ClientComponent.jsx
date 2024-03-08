"use client";
import React, { useEffect, useTransition, useState } from "react";
import fetchToken from "./actions/fetchToken";
import skipSong from "./actions/skipSong";
import requestAuth from "./actions/requestAuth";
import fetchSongData from "./actions/fetchSongData";

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

<<<<<<< HEAD
  useEffect(() => {
    setToken(fetchToken(code));
  }, [code]);
=======
   useEffect(() => {
      const fetchTokenAndUpdate = async () => {
         if (code) {
            const token = await fetchToken(code);
            setToken(token);
         }
      };

      fetchTokenAndUpdate();
   }, [code]);
>>>>>>> 5d7214b7a13d255987bc7fbca13dfbd69175dbb8

  function onAuthClick() {
    startTransition(() => {
      requestAuth();
    });
  }

<<<<<<< HEAD
    function handleSkipSong() {
      console.log("Hello Token:", token);
      skipSong("Bearer " + token);
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

      <button type="button" onClick={handleSkipSong}>
        SKIP SONG
      </button>
      <h1>Token: {token}</h1>
      <h1>Code: {code}</h1>
    </>
  );
=======
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
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => {
               skipSong(token);
            }}
         >
            SKIP SONG
         </button>
         <button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => {
               fetchSongData(token);
            }}
         >
            FETCH SONG DATA
         </button>
         <h1>Token: {token}</h1>
         <h1>Code: {code}</h1>
      </>
   );
>>>>>>> 5d7214b7a13d255987bc7fbca13dfbd69175dbb8
};

export default ClientComponent;
