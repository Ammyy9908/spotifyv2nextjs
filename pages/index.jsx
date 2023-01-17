import Layout from "../components/Layout";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import Content from "../components/Content";
import Nav from "../components/Nav";
import ShortcutItem from "../components/Shortcut";
import React, { useState } from "react";
import SectionWrapper from "../components/SectionWrapper";
import SectionItem from "../components/SectionItem";
import havePublicAccessToken from "../utils/check_public_token";
import getPublicAccessToken from "../utils/get_public_access_token";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import { Toaster } from "react-hot-toast";
import getPublicAccessData from "../utils/get_public_data";
import {
  setArtists,
  setBanner,
  setOfflineData,
  setPlaylists,
  setRecents,
  setShows,
  setUser,
} from "../redux/actions/_appActions";
import haveLoginAccessToken from "../utils/check_login_status";
import getProfile from "../utils/get_profile";
import getPlaylists from "../utils/get_playlists";
import OfflineBanner from "../components/OfflineBanner";
import getRecents from "../utils/get_recents";
import BlankShortcut from "../components/BlankShortcut";
import getTopArtists from "../utils/top_artists";
import BlankCard from "../components/BlankCard";
import getMyShows from "../utils/getShows";
import registerUser from "../utils/registerUser";
import Cookies from "js-cookie";
import getCurrentUser from "../utils/getProfile";
import getUser from "../utils/getUser";

function Home({
  user,
  setPublicData,
  publicData,
  setUser,
  setPlaylists,
  offline_banner,
  setBanner,
  setRecents,
  recents,
  setArtists,
  artists,
  network_status,
  player_state,
  setShows,
  shows,
}) {
  const [scroll, setScroll] = useState(0);
  const [gradient, setGradient] = useState("rgba(248,56,40)");
  React.useEffect(() => {
    // FIRST CHECK IF THE USER HAS A lOGIN ACCESS TOKEN

    if (haveLoginAccessToken()) {
      async function Init() {
        getProfile().then(async (u) => {
          if (!Cookies.get("JWT_TOKEN")) {
            registerUser(u.display_name, u.images[0].url, u.id).then(
              async (token) => {
                console.log("JWT TOKEN", token);
                Cookies.set("JWT_TOKEN", token.data);
              }
            );
          } else {
            const usr = await getCurrentUser();
            setUser(usr.me);
          }
        });

        let playlists = await getPlaylists();
        setPlaylists(playlists);
        let recents = await getRecents();
        let artists = await getTopArtists();
        let publicData = await getPublicAccessData();
        const { data } = publicData;
        if (data) {
          const { home } = data;
          const { greeting, sectionContainer } = home;
          const { sections } = sectionContainer;
          setPublicData({ greeting, sections });
        }

        let shows = await getMyShows();
        console.log("shows", shows);

        setTimeout(() => {
          setRecents(recents);
          setArtists(artists);
          setShows(shows);
        }, 3000);
      }
      Init();
    } else {
      if (havePublicAccessToken()) {
        console.log("User is logged in");
        getPublicAccessData()
          .then((d) => {
            const { data } = d;
            if (data) {
              const { home } = data;
              const { greeting, sectionContainer } = home;
              const { sections } = sectionContainer;
              setPublicData({ greeting, sections });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        getPublicAccessToken()
          .then((d) => {
            const { accessToken, clientId } = d;
            Cookies.set("accessToken", accessToken);
            Cookies.set("clientId", clientId);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);
  return (
    <div>
      <Layout>
        <Sidebar />
        <Content setScroll={setScroll} color={gradient}>
          <div className="content_screen">
            <Nav scroll={scroll} color={gradient} />
            {user && (
              <div className="greet__section px-8 py-2 my-6">
                <h1 className="text-3xl text-white font-semibold">
                  {publicData && publicData.greeting.text}
                </h1>
                <div className="shortcuts grid sm:grid-cols-2 md:grid-cols-3 gap-6 my-3">
                  {recents
                    ? [...new Set(recents.items.map((item) => item))]
                        .slice(0, 6)
                        .map((recent) => {
                          return (
                            <ShortcutItem
                              recent={recent.track.name}
                              cover={recent.track.album.images[0].url}
                              color={"#000000"}
                              setGradient={setGradient}
                              item={recent}
                            />
                          );
                        })
                    : [0, 0, 0, 0, 0, 0].map((blank, i) => {
                        return <BlankShortcut />;
                      })}
                </div>
              </div>
            )}
            {user && (
              <>
                <SectionWrapper>
                  <h1 className="text-2xl font-bold text-white">Top artists</h1>
                  <Swiper
                    className="my-6"
                    effect="fade"
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    spaceBetween={30}
                    modules={[Autoplay, Navigation]}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    slidesPerView={1}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                      },
                    }}
                  >
                    {artists
                      ? artists.items.map((item, i) => {
                          return (
                            <SwiperSlide>
                              {" "}
                              <SectionItem
                                cover={item.images[0].url}
                                title={item.name}
                                setGradient={setGradient}
                                type="artist"
                                item={item}
                              />
                            </SwiperSlide>
                          );
                        })
                      : [0, 0, 0, 0, 0].map((blank, i) => {
                          return <BlankCard />;
                        })}
                  </Swiper>
                </SectionWrapper>
                {publicData &&
                  publicData.sections.items
                    .slice(0, 4)
                    .filter((item) => item.sectionItems.items.length > 1)
                    .map((section, i) => {
                      return (
                        <SectionWrapper>
                          <h1 className="text-2xl font-bold text-white">
                            {section.data.title.text}
                          </h1>
                          <Swiper
                            className="my-6"
                            spaceBetween={50}
                            onSlideChange={() => console.log("slide change")}
                            onSwiper={(swiper) => console.log(swiper)}
                            autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Navigation]}
                            slidesPerView={1}
                            breakpoints={{
                              640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                              },
                              768: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                              },
                              1024: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                              },
                            }}
                          >
                            {section.sectionItems.items
                              .filter(
                                (item) =>
                                  item.content.data?.images?.items.length > 0
                              )
                              .map((item, i) => {
                                return (
                                  <SwiperSlide>
                                    <SectionItem
                                      cover={
                                        item.content.data.images.items[0]
                                          .sources[0].url
                                      }
                                      title={item.content.data.name}
                                      type={item.content.data.__typename}
                                      color={
                                        item.content.data.images.items[0]
                                          .extractedColors?.colorDark.hex
                                      }
                                      setGradient={setGradient}
                                      setBanner={setBanner}
                                      item={item}
                                    />
                                  </SwiperSlide>
                                );
                              })}
                          </Swiper>
                        </SectionWrapper>
                      );
                    })}

                <SectionWrapper>
                  <h1 className="text-2xl font-bold text-white">Your shows</h1>
                  <div className="section-items grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 my-6">
                    {shows
                      ? shows.items.slice(0, 5).map((item, i) => {
                          return (
                            <SectionItem
                              cover={item.show.images[0].url}
                              title={item.show.name}
                              setGradient={setGradient}
                              type="show"
                              item={item}
                            />
                          );
                        })
                      : [0, 0, 0, 0, 0].map((blank, i) => {
                          return <BlankCard />;
                        })}
                  </div>
                </SectionWrapper>
              </>
            )}

            {!user &&
              (publicData
                ? publicData.sections.items
                    .slice(0, 4)
                    .filter((item) => item.sectionItems.items.length > 1)
                    .map((section, i) => {
                      return (
                        <SectionWrapper>
                          <h1 className="text-2xl font-bold text-white">
                            {section.data.title.text}
                          </h1>
                          <div className="section-items grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 my-6">
                            {section.sectionItems.items
                              .filter(
                                (item) =>
                                  item.content.data?.images?.items.length > 0
                              )
                              .map((item, i) => {
                                return (
                                  <SectionItem
                                    cover={
                                      item.content.data.images.items[0]
                                        .sources[0].url
                                    }
                                    title={item.content.data.name}
                                    type={item.content.data.__typename}
                                    color={
                                      item.content.data.images.items[0]
                                        .extractedColors?.colorDark.hex
                                    }
                                    setGradient={setGradient}
                                    setBanner={setBanner}
                                    item={item}
                                  />
                                );
                              })}
                          </div>
                        </SectionWrapper>
                      );
                    })
                : [0, 0, 0, 0, 0, 0, 0].map((blank, i) => {
                    return (
                      <SectionWrapper>
                        <div className="w-[130px] rounded-full h-[12px] bg-white/50 loader"></div>
                        <div className="section-items grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 my-6">
                          {[0, 0, 0, 0, 0].map((blank, i) => {
                            return <BlankCard />;
                          })}
                        </div>
                      </SectionWrapper>
                    );
                  }))}
          </div>
        </Content>
      </Layout>
      {user && <Player />}

      {offline_banner && (
        <OfflineBanner setBanner={setBanner} offline_banner={offline_banner} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
  publicData: state.appReducer.publicData,
  offline_banner: state.appReducer.offline_banner,
  recents: state.appReducer.recents,
  artists: state.appReducer.artists,
  shows: state.appReducer.shows,
});

const mapDispatchToProps = (dispatch) => ({
  setPublicData: (data) => dispatch(setOfflineData(data)),
  setUser: (user) => dispatch(setUser(user)),
  setBanner: (banner) => dispatch(setBanner(banner)),
  setPlaylists: (playlists) => dispatch(setPlaylists(playlists)),
  setRecents: (recents) => dispatch(setRecents(recents)),
  setArtists: (artists) => dispatch(setArtists(artists)),
  setShows: (shows) => dispatch(setShows(shows)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
