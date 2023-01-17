import "../styles/globals.css";
import configureStore from "../redux/store";
import { connect, Provider } from "react-redux";
import React from "react";
import Cookies from "js-cookie";
import getPublicAccessToken from "../utils/get_public_access_token";
// eslint-disable-next-line
import "swiper/css/bundle";
import useNetwork from "../hooks/useNetwork";
import usePlayerState from "../hooks/usePlayerState";
import { Toaster } from "react-hot-toast";

const store = configureStore();
function MyApp({ Component, pageProps }) {
  const network_status = useNetwork();
  const player_state = usePlayerState();
  React.useEffect(() => {
    getPublicAccessToken()
      .then((d) => {
        console.log(d);
        const { accessToken, clientId } = d;
        Cookies.set("accessToken", accessToken);
        Cookies.set("clientId", clientId);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  React.useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);
  return (
    <Provider store={store}>
      <Toaster position="bottom-right" />
      <Component
        {...pageProps}
        network_status={network_status}
        player_state={player_state}
      />
    </Provider>
  );
}

export default MyApp;
