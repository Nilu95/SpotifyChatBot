"use client";
import React, { useEffect, useTransition, useState } from "react";
import fetchToken from "./actions/fetchToken";
import skipSong from "./actions/skipSong";
import requestAuth from "./actions/requestAuth";

const ClientComponent = () => {
   const [isPending, startTransition] = useTransition();
   const [token, setToken] = useState(null);

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
