import axios from "axios";
import Cookies from "js-cookie";
const getCurrentUser = async () => {
  try {
    const r = await axios.get(`http://localhost:5001/api/me`, {
      headers: {
        Authorization: Cookies.get("JWT_TOKEN"),
      },
    });
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default getCurrentUser;
