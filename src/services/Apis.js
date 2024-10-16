import axios from "axios";

const API_URL = "https://data-ir.argaam.com/authenticate";
const TOKEN_KEY = "authToken";
const TOKEN_EXPIRY_KEY = "authTokenExpiry";

export async function authenticate() {
  try {
    const response = await axios.post(API_URL, {
      username: "ALHOKAIR_GROUP",
      password: "T44S21-PK4A51C4CF78967C857BE8F-X0007F-4Z",
    });
    const token = response.data.jwtToken;
    const expires = new Date(response.data.expires).getTime();
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, expires.toString());
    console.log("Token stored:", token);
    return token;
  } catch (error) {
    console.error("Authentication failed:", error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function getAuthToken() {
  const storedToken = sessionStorage.getItem(TOKEN_KEY);
  const storedExpiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);

  if (storedToken && storedExpiry) {
    const currentTime = Date.now();
    if (currentTime < parseInt(storedExpiry, 10)) {
      console.log("Token retrieved from session storage:", storedToken);
      return storedToken;
    }
  }

  console.log("Token expired or not found, refreshing...");
  const newToken = await authenticate();
  console.log("Token refreshed:", newToken);
  return newToken;
}

export async function getOverview() {
  try {
    const authToken = await getAuthToken();
    const response = await axios.get("https://data-ir.argaam.com/api/v1/json/ir-api/overview", {
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch news:", error.response ? error.response.data : error.message);
    throw error;
  }
}

