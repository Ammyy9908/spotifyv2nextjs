import axios from "axios";

const getPublicAccessToken = async () => {
  try {
    const r = await axios.get("http://localhost:5001/public/token");
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

export default getPublicAccessToken;
