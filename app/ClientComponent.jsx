"use client";

import React, { useEffect, useTransition, useState } from "react";
import fetchToken from "./actions/fetchToken";
import fetchSongData from "./actions/fetchSongData";
import AuthButton from "./components/AuthButton";
import PausePlayButton from "./components/PausePlayButton";
import SkipSongButton from "./components/SkipSongButton";
import PreviousSongButton from "./components/PreviousSongButton";
import OpenAI from "openai";
import ChatWidget from "./components/ChatWidget";

const ClientComponent = () => {
   const [token, setToken] = useState(null);
   const [code, setCode] = useState(null);
   const [albumImage, setAlbumImage] = useState(null);
   const [artistInfo, setArtistInfo] = useState(null);
   const [songName, setSongName] = useState(null);
   const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true,
   });

   async function sendChatMessage() {
      const completion = await openai.chat.completions.create({
         messages: [
            {
               role: "system",
               content: "Tell me about spotify",
            },
         ],
         model: "gpt-3.5-turbo",
      });

      console.log(completion.choices[0].message.content);
   }

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

   return (
      <>
         {albumImage && <img src={albumImage} alt="Album Cover" style={{ maxWidth: "300px" }} />}
         {songName && <h1>{songName}</h1>}
         {artistInfo && <h1>{artistInfo}</h1>}
         <AuthButton />
         <PausePlayButton token={token} />
         <SkipSongButton token={token} />
         <PreviousSongButton token={token} />
         <ChatWidget />
         <button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={sendChatMessage}
         >
            SEND CHAT MESSAGE
         </button>
      </>
   );
};

export default ClientComponent;
