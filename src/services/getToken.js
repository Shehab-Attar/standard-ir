import axios from "axios";

// Object to hold the token and its expiration time
let tokenData = {
  token: null,
  expires: null,
};

export const getToken = async () => {

  const currentTime = new Date().getTime();
  const tokenExpiry = tokenData.expires ? new Date(tokenData.expires).getTime() : 0;

  // Check if the token is absent or has expired
  if (!tokenData.token || currentTime >= tokenExpiry) {
    try {
      // Authenticate and get a new token
      const response = await axios.post("https://data.argaam.com/authenticate", {
        username: "ALHOKAIR_GROUP",
        password: "T44S21-PK4A51C4CF78967C857BE8F-X0007F-4Z",
      });

      if (response.status === 200) {
        // Update tokenData with the new token and expiration
        const { jwtToken, expires } = response.data;
        tokenData = { token: jwtToken, expires };
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      
    }
  }

  return tokenData.token; // Return the current valid token
};