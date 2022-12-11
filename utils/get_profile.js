import axios from "axios";
import Cookies from "js-cookie";

const getProfile = async () => {
  try {
    const r = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${Cookies.get("SPOTIFY_TOKEN")}`,
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

export default getProfile;
