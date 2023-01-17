import axios from "axios";

const playPrev = async () => {
  try {
    const r = await axios.post(
      `https://api.spotify.com/v1/me/player/previous`,
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

export default playPrev;
