import axios from "axios";
import Cookies from "js-cookie";

const pausePlayer = async () => {
  try {
    const r = await axios.put(
      `https://api.spotify.com/v1/me/player/pause?device_id=${localStorage.getItem(
        "DEVICE_ID"
      )}`,
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

export default pausePlayer;
