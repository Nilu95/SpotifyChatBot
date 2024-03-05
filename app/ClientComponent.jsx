"use client";
import React, { useEffect, useTransition, useState } from "react";
import fetchToken from "./actions/fetchToken";

const ClientComponent = () => {
   const [isPending, startTransition] = useTransition();
   const [token, setToken] = useState("null");

   function onClick() {
      startTransition(() => {
         fetchToken();
         setToken(fetchToken);
      });
   }

   return (
      <>
         <button
            type="button"
            onClick={() => {
               onClick();
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
