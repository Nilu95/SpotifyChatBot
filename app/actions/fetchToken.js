"use server";

// CLIENT CREDENTIALS
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const fetchToken = async (code) => {
   const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
         Authorization: `Basic ${new Buffer.from(client_id + ":" + client_secret).toString(
            "base64"
         )}`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
   });

   const token = await tokenResponse.json();
   return token.access_token;
   // console.log(token);
};

export default fetchToken;
