import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function authorize() {
  const router = useRouter();
  const { access_token, refresh_token } = router.query;

  React.useEffect(() => {
    if (access_token) {
      Cookies.set("SPOTIFY_TOKEN", access_token);
      Cookies.set("SPOTIFY_REFRESH_TOKEN", refresh_token);
      localStorage.setItem("SPOTIFY_TOKEN", access_token);
      localStorage.setItem("SPOTIFY_REFRESH_TOKEN", refresh_token);
      window.location.href = "/";
    }
  }, [router.query]);
  return <div>authorize</div>;
}

export default authorize;
