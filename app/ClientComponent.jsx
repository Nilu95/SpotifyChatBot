"use client";

import React, { useEffect, useTransition, useState } from "react";
import fetchToken from "./actions/fetchToken";
import skipSong from "./actions/skipSong";
import requestAuth from "./actions/requestAuth";
import fetchSongData from "./actions/fetchSongData";

const ClientComponent = () => {
   const [isPending, startTransition] = useTransition();
   const [token, setToken] = useState(null);
   const [code, setCode] = useState(null);
   const [albumImage, setAlbumImage] = useState(null);
   const [artistInfo, setArtistInfo] = useState(null);
   const [songName, setSongName] = useState(null);

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
   }, [code]);

   useEffect(() => {
      const fetchTokenAndUpdate = async () => {
         if (code) {
            const token = await fetchToken(code);
            setToken(token);
         }
      };

      fetchTokenAndUpdate();
   }, [code]);

   useEffect(() => {
      // Call getSongData initially and then set up interval to call it periodically
      getSongData();
      const intervalId = setInterval(getSongData, 500);

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
   }, [token]); // Only trigger when the token changes

   async function getSongData() {
      const songData = await fetchSongData(token);
      if (songData) {
         const albumImageUrl = songData.item.album.images[0].url;
         setAlbumImage(albumImageUrl);

         const songName = songData.item.name;
         setSongName(songName);

         let artists = "";

         for (let i = 0; i < songData.item.artists.length; i++) {
            artists += songData.item.artists[i].name;
            if (i < songData.item.artists.length - 1) {
               // If this is not the last artist in the list, add a comma and a space
               artists += ", ";
            }
         }

         setArtistInfo(artists);
      }
   }

   function onAuthClick() {
      startTransition(() => {
         requestAuth();
      });
   }

   return (
      <>
         {albumImage && <img src={albumImage} alt="Album Cover" style={{ maxWidth: "300px" }} />}
         {songName && <h1>{songName}</h1>}
         {artistInfo && <h1>{artistInfo}</h1>}
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
      </>
   );
};

export default ClientComponent;
