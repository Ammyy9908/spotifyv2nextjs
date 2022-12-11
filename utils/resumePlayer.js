import axios from "axios";
import Cookies from "js-cookie";

const resumePlayer = async () => {
  try {
    const r = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {},
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

export default resumePlayer;
