import axios from "axios";
import Cookies from "js-cookie";
const getExtractedColors = async (cover) => {
  try {
    const r = await axios.get(`http://localhost:5001/extract/colors`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Cookies.get("accessToken")}`,
        uri: `${cover}`,
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

export default getExtractedColors;
