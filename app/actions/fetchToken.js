"use server";

const fetchToken = async () => {
   // try {
   //    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
   //       method: "POST",
   //       headers: {
   //          "Content-Type": "application/x-www-form-urlencoded",
   //          Authorization: "Basic " + btoa(client_id + ":" + client_secret),
   //       },
   //       body: "grant_type=client_credentials",
   //    });

   //    const token = await tokenResponse.json();
   //    console.log(token);
   //    return token;
   // } catch (error) {
   //    console.error("Error fetching token:", error);
   //    return null;
   // }
   alert("HELLO");
};

export default fetchToken;
