import axios from "axios";

async function getMyShows() {
  try {
    const r = await axios.get("https://api.spotify.com/v1/me/shows", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("SPOTIFY_TOKEN"),
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
  }
}

export default getMyShows;
