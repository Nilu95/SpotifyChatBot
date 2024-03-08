"use server";

const skipSong = async (access_token) => {
   const fetchConfig = {
      method: "POST",
      headers: {
         Authorization: `Bearer ${access_token}`,
      },
   };

   const response = await fetch("https://api.spotify.com/v1/me/player/next", fetchConfig);

   // const data = await response.json();
   console.log(response);
   console.log(access_token);
   console.log(fetchConfig);
   //console.log(data, "\n");
};

export default skipSong;
