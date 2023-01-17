import axios from "axios";

async function getUser(uid) {
  try {
    const r = await axios.get(`https://api.spotify.com/v1/users/${uid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SPOTIFY_TOKEN"),
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
  }
}

export default getUser;
