import axios from "axios";
import Cookies from "js-cookie";
const getHomeData = async () => {
  try {
    const r = await axios.get("http://localhost:5001/home/data", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Cookies.get("SPOTIFY_TOKEN")}`,
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

export default getHomeData;
