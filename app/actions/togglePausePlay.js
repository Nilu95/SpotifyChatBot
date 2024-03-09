export default async function togglePausePlay(access_token) {
   try {
      // Pause the player if it's currently playing
      const pauseResponse = await fetch("https://api.spotify.com/v1/me/player/pause", {
         method: "PUT",
         headers: {
            Authorization: "Bearer " + access_token,
         },
      });
      const pauseData = await pauseResponse.json();

      // If the player was paused, play the player
      const playResponse = await fetch("https://api.spotify.com/v1/me/player/play", {
         method: "PUT",
         headers: {
            Authorization: "Bearer " + access_token,
         },
      });
      const playData = await playResponse.json();
   } catch (error) {
      console.error(error);
   }
}
