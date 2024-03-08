"use server";

// CLIENT CREDENTIALS
const client_id = "9224009bb2c14b40886767141ffec1ad";
const client_secret = "74d6862034ff450fa04e945de09a1adc";
const redirect_uri = "http://localhost:3000/";

const fetchToken = async (code) => {
   try {
      const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
         method: "POST",
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(client_id + ":" + client_secret),
         },
         body:
            "grant_type=authorization_code&code=" +
            code +
            "&redirect_uri=" +
            encodeURIComponent(redirect_uri),
      });

      const token = await tokenResponse.json();
      console.log(token);
      return token.access_token;
   } catch (error) {
      // console.error("Error fetching token:", error);
      return null;
   }
};

export default fetchToken;
