"use client";

import React, { useEffect, useTransition, useState } from "react";
import fetchToken from "./actions/fetchToken";
import skipSong from "./actions/skipSong";
import requestAuth from "./actions/requestAuth";
import fetchSongData from "./actions/fetchSongData";
import previousSong from "./actions/previousSong";
import togglePausePlay from "./actions/togglePausePlay";

const ClientComponent = () => {
   const [isPending, startTransition] = useTransition();
   const [token, setToken] = useState(null);
   const [code, setCode] = useState(null);
   const [albumImage, setAlbumImage] = useState(null);
   const [artistInfo, setArtistInfo] = useState(null);
   const [songName, setSongName] = useState(null);
   const [isPaused, setIsPaused] = useState(false); // New state variable for tracking pause/play

   useEffect(() => {
      const getCodeFromURL = () => {
         const urlParams = new URLSearchParams(window.location.search);
         const code = urlParams.get("code");
         if (code) {
            sessionStorage.setItem("spotifyCode", code);
            setCode(code);
         }
      };

      getCodeFromURL();
   }, []);

   useEffect(() => {
      const fetchTokenAndUpdate = async () => {
         if (code) {
            const token = await fetchToken(code);
            setToken(token);
            localStorage.setItem("spotifyToken", token);
         }
      };

      fetchTokenAndUpdate();
   }, [code]);

   useEffect(() => {
      // Check if token exists in local storage
      const storedToken = localStorage.getItem("spotifyToken");
      if (storedToken) {
         setToken(storedToken);
      }
   }, []);

   useEffect(() => {
      const intervalId = setInterval(() => {
         if (token) {
            getSongData();
         }
      }, 500);

      return () => clearInterval(intervalId);
   }, [token]);

   async function getSongData() {
      const songData = await fetchSongData(token);

      if (songData) {
         // Check if player is paused
         setIsPaused(!songData.is_playing);
      }

      if (
         songData &&
         songData.item &&
         songData.item.album &&
         songData.item.album.images &&
         songData.item.album.images.length > 0
      ) {
         const albumImageUrl = songData.item.album.images[0].url;
         setAlbumImage(albumImageUrl);

         const songName = songData.item.name;
         setSongName(songName);

         let artists = "";

         songData.item.artists.forEach((artist, index) => {
            artists += artist.name;
            if (index < songData.item.artists.length - 1) {
               artists += ", ";
            }
         });

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
            onClick={onAuthClick}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
         >
            Request Auth
         </button>
         <button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => togglePausePlay(token)}
         >
            {isPaused ? "PLAY" : "PAUSE"}
         </button>
         <button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => skipSong(token)}
         >
            SKIP SONG
         </button>
         <button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => previousSong(token)}
         >
            PREVIOUS SONG
         </button>
      </>
   );
};

export default ClientComponent;
