import axios from "axios";
import Cookies from "js-cookie";
const getPublicAccessData = async () => {
  try {
    const r = await axios.get("http://localhost:5001/public/data", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

export default getPublicAccessData;
