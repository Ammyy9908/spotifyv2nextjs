import axios from "axios";
import Cookies from "js-cookie";

const getTopArtists = async () => {
  try {
    const r = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=30",
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

export default getTopArtists;
