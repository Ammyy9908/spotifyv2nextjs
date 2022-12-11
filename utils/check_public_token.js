import Cookies from "js-cookie";

const havePublicAccessToken = () => {
  const publicAccessToken = Cookies.get("accessToken");
  if (publicAccessToken) {
    return true;
  }
  return false;
};

export default havePublicAccessToken;
