import axios from "axios";
import Cookies from "js-cookie";
const editProfile = async (id, name) => {
  try {
    const r = await axios.put(
      `http://localhost:5001/api/me/update/${id}`,
      {
        name,
      },
      {
        headers: {
          Authorization: Cookies.get("JWT_TOKEN"),
        },
      }
    );
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default editProfile;
