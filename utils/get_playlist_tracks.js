import axios from "axios";
import Cookies from "js-cookie";

const GetPlaylistTracks = async (playlist_id) => {
  try {
    const r = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

export default GetPlaylistTracks;
