import axios from "axios";
import Cookies from "js-cookie";

const getRecents = async () => {
  try {
    const r = await axios.get(
      "	https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("SPOTIFY_TOKEN")}`,
        },
      }
    );
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

export default getRecents;
