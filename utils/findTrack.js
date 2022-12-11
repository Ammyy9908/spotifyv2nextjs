import axios from "axios";
import Cookies from "js-cookie";

const findTrack = async (query) => {
  try {
    const r = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track&market=IN`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("SPOTIFY_TOKEN")}`,
        },
      }
    );
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

export default findTrack;
