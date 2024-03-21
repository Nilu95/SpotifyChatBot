"use server";
import { redirect } from "next/navigation";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const scope =
   "user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";

const requestAuth = async () => {
   const AUTHORIZE = "https://accounts.spotify.com/authorize";

   let url = `${AUTHORIZE}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;

   redirect(url);
};

export default requestAuth;
