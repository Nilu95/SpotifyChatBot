import React, { useEffect, useTransition, useState } from "react";
import requestAuth from "../actions/requestAuth";

const AuthButton = () => {
   const [isPending, startTransition] = useTransition();

   function onAuthClick() {
      startTransition(() => {
         requestAuth();
      });
   }

   return (
      <button
         type="button"
         onClick={onAuthClick}
         className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
         Request Auth
      </button>
   );
};

export default AuthButton;
