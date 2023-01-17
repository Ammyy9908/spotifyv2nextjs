import axios from "axios";

const getPlayer = async () => {
  try {
    const r = await axios.get(`https://api.spotify.com/v1/me/player`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("SPOTIFY_TOKEN")}`,
      },
    });

    return r;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default getPlayer;
