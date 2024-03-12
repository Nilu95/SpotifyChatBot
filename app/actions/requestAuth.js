"use server";
import { redirect } from "next/navigation";

const client_id = "9224009bb2c14b40886767141ffec1ad";
const client_secret = "74d6862034ff450fa04e945de09a1adc";
const redirect_uri = "http://localhost:3000/";

const scope =
   "user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";

const requestAuth = async () => {
   const AUTHORIZE = "https://accounts.spotify.com/authorize";

   let url = `${AUTHORIZE}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;

   redirect(url);
};

export default requestAuth;
