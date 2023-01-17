import axios from "axios";

const changeVolume = async (volume) => {
  try {
    const r = await axios.put(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("SPOTIFY_TOKEN")}`,
        },
      }
    );

    return r;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default changeVolume;
