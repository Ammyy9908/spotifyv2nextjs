import Cookies from "js-cookie";

const haveLoginAccessToken = () => {
  const AccessToken = Cookies.get("SPOTIFY_TOKEN");
  if (AccessToken) {
    return true;
  }
  return false;
};

export default haveLoginAccessToken;
