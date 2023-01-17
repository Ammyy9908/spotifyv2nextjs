import axios from "axios";

const transferTrack = async (id) => {
  try {
    const r = await axios.put(
      `	https://api.spotify.com/v1/me/player`,
      {
        device_ids: [id],
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

export default transferTrack;
