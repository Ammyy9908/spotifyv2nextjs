import axios from "axios";

const likeSong = async (track) => {
  try {
    const r = await axios.put(
      `https://api.spotify.com/v1/me/tracks?ids=${track}`,
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

export default likeSong;
