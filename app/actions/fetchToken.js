"use server";

// CLIENT CREDENTIALS
const client_id = "9224009bb2c14b40886767141ffec1ad";
const client_secret = "74d6862034ff450fa04e945de09a1adc";

const fetchToken = async () => {
   try {
      const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
         method: "POST",
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(client_id + ":" + client_secret),
         },
         body: "grant_type=client_credentials",
      });

      const token = await tokenResponse.json();
      console.log(token);
      return token.access_token;
   } catch (error) {
      console.error("Error fetching token:", error);
      return null;
   }
};

export default fetchToken;
