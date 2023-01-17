import axios from "axios";

const registerUser = async (name, avatar, spotify_id) => {
  try {
    const r = await axios.post("http://localhost:5001/api/register", {
      name,
      spotify_id,
      avatar,
    });
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default registerUser;
