"use server";

// CLIENT CREDENTIALS
const client_id = "9224009bb2c14b40886767141ffec1ad";
const client_secret = "74d6862034ff450fa04e945de09a1adc";
const redirect_uri = "http://localhost:3000/";

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
