import axios from "axios";

const playNext = async () => {
  try {
    const r = await axios.post(
      `https://api.spotify.com/v1/me/player/next`,
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

export default playNext;
