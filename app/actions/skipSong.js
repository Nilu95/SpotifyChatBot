"use server";

const skipSong = async (access_token) => {
   const response = await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
         Authorization: `Bearer ${access_token}`,
      },
   });
};

export default skipSong;
