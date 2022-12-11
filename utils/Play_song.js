import axios from "axios";
import Cookies from "js-cookie";

const playSong = async (uri) => {
  try {
    const r = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${localStorage.getItem(
        "DEVICE_ID"
      )}`,
      {
        uris: [uri],
      },
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

export default playSong;
