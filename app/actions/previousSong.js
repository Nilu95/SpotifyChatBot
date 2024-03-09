"use server";

export default async function previousSong(access_token) {
   const response = await fetch("https://api.spotify.com/v1/me/player/previous", {
      method: "POST",
      headers: {
         Authorization: `Bearer ${access_token}`,
      },
   });
}
