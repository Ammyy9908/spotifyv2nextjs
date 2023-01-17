import { useRouter } from "next/router";
import React, { useState } from "react";
import { connect } from "react-redux";
import Content from "../../components/Content";
import Layout from "../../components/Layout";
import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import getExtractedColors from "../../utils/getExtratedColors";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import getCurrentUser from "../../utils/getProfile";
import editProfile from "../../utils/editName";
import { toast } from "react-hot-toast";
import { HiPencil } from "react-icons/hi";
import { Loader } from "rsuite";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { ColorRing } from "react-loader-spinner";
import Player from "../../components/Player";
import SectionItem from "../../components/SectionItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import SectionWrapper from "../../components/SectionWrapper";
import TrackList from "../../components/TrackList";
import { setTopTracks } from "../../redux/actions/_appActions";
import getTopTracks from "../../utils/getTopTracks";
import getFollowing from "../../utils/getFollowing";
import { FaForward } from "react-icons/fa";

function EditProfileForm({ user, setProfileForm, setUser, setUserData }) {
  console.log("user at form", user);

  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleEditProfile = async () => {
    const r = await editProfile(user.spotify_id, name);

    const { error, message } = r;
    if (error) {
      toast.error(message);
      return;
    }
    console.log(r);
    toast.success(message);
    setUser(r.me);
    setUserData(r.me);
    setProfileForm(false);
  };
  return (
    <div
      className="edit-profile-form-popup-overlay w-full h-screen fixed z-120 bg-black/40 flex items-center justify-center backdrop-blur-md"
      style={{
        zIndex: 100,
      }}
    >
      <div className=" rounded-md edit-profile-form-modal bg-gray-400/70 py-4 px-6 backdrop-blur-lg">
        <div className="edit-profile-modal-header flex w-full justify-between items-center my-3 text-white">
          <h3 className="text-2xl font-bold">Profile details</h3>
          <button
            onClick={() => {
              setProfileForm(false);
            }}
          >
            <MdClear />
          </button>
        </div>
        <div className="profile-edit-form flex items-center gap-12 mb-3 w-full justify-center">
          <div className="relative  group profile-avatar w-[170px] h-[170px] bg-gray-400 rounded-full">
            <img
              src={user?.avatar}
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="opacity-0 z-100 group-hover:opacity-100 flex items-center flex-col justify-center avatar-form absolute w-full h-full bg-black/70 inset-0 rounded-full">
              <div className="text-white flex flex-col items-center gap-3">
                <button className="hover:underline">Choose photo</button>
                <span className="text-4xl">
                  <HiPencil />
                </span>
                <button className="hover:underline"> Remove photo</button>
              </div>
            </div>
            {loading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center">
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#ffffff",
                    "#ffffff",
                    "#ffffff",
                    "#ffffff",
                    "#ffffff",
                  ]}
                />
              </div>
            )}
          </div>
          <div className="profile-form w-[210px] flex flex-col items-end gap-3">
            <input
              type="text"
              placeholder="Name"
              className="w-full h-[40px] bg-black/50 px-3 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="px-2 py-3 bg-white w-[110px] rounded-full font-bold"
              onClick={() => {
                handleEditProfile();
              }}
            >
              Save
            </button>
          </div>
        </div>
        <p className="text-xs text-white/50">
          By proceeding, you agree to give access to spotify to modify user
          profile
        </p>
      </div>
    </div>
  );
}

function Profile({
  profile_form,
  setProfileForm,
  setUser,
  user,
  artists,
  setTopTracks,
  top_tracks,
  playlists,
}) {
  const router = useRouter();
  const [rendered, setRendered] = React.useState(false);
  const [following, setFollowing] = React.useState(false);
  const [u, setUserData] = React.useState(null);
  const { uid } = router.query;
  const [scroll, setScroll] = useState(0);
  const [gradient, setGradient] = useState("rgba(0,0,0)");
  const [color, setColor] = React.useState(null);

  React.useEffect(() => {
    async function fetchUser() {
      const response = await getCurrentUser();
      console.log(response);
      setUserData(response.me);
      const crls = await getExtractedColors(u && u.avatar);

      u && setColor(crls && crls?.data?.extractedColors[0].colorLight.hex);

      async function fetchFollowings() {
        console.log("Fetching");
        const response = await getFollowing();
        console.log("Followings", response);
        setFollowing(response.artists.items);
      }
      fetchFollowings();
    }

    async function fetchTopTracks() {
      const response = await getTopTracks();
      console.log("Top Tracks", response);
      setTopTracks(response);
    }
    if (uid) {
      fetchUser();
      setRendered(true);
    }
    fetchTopTracks();
  }, [uid]);

  if (!rendered) {
    return null;
  }

  console.log("Playlists", playlists, "User", user);
  return (
    <div>
      <Layout>
        <Sidebar />
        <Content setScroll={setScroll} color={color ? color : gradient}>
          <Nav scroll={scroll} color={gradient ? gradient : "#000000"} />
          <div className="profile-page-section">
            <div
              className="user-profile-section py-16 px-16"
              style={{
                backgroundColor: color,
                backgroundImage: `linear-gradient(${color} 0,${gradient} 100%),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=);`,
              }}
            >
              <div className="user-profile flex flex-col md:flex-row items-center gap-12">
                <div className="shadow-2xl transition-all user-avatar w-32 h-32 md:w-64 md:h-64 bg-gray-400 rounded-full">
                  {u && (
                    <img
                      src={u.avatar}
                      alt="user-avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
                <div className="user-text-content text-white">
                  <p className="uppercase font-semibold md:text-left text-center">
                    Profile
                  </p>
                  {u && (
                    <h3 className=" text-6xl md:text-8xl font-bold transition-all text-center">
                      {u.name}
                    </h3>
                  )}
                  <div className="mt-3 flex items-center gap-2 justify-center md:justify-start">
                    <span>3 Playlists</span>
                    <span>.</span>
                    <span>17 Followings</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-page-content px-12 py-12 text-white">
              <div className="profile-page-heaer ">
                <button className="relative w-12 h-12 hover:bg-gray-400/50 flex items-center justify-center rounded-full text-2xl group">
                  <FiMoreHorizontal />
                  <div
                    className="w-[150px] profile-context-menu text-sm absolute  flex-col gap-2 items-start bg-slate-700 px-2 py-2 top-10 left-3 rounded flex group-focus:scale-100 scale-0 transition-all"
                    style={{
                      transformOrigin: "0 top",
                    }}
                  >
                    <button
                      className="text-md w-full px-2 py-2 flex items-start"
                      onClick={() => {
                        setProfileForm(true);
                      }}
                    >
                      Edit profile
                    </button>
                    <button className="text-md w-full px-2 py-2 flex items-start">
                      Copy profile link
                    </button>
                  </div>
                </button>
              </div>

              <section className="mb-32">
                <div className="section-header w-full flex justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold">
                      Top artists this month
                    </h3>
                    <p className="text-md mt-3 text-white/50">
                      Only visible to you
                    </p>
                  </div>
                  <a href="#" className="uppercase">
                    View all
                  </a>
                </div>
                <div className="section-grid relative">
                  {/* <button className="absolute top-[50%] -left-5 z-50 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <BsArrowLeft />
                  </button> */}
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
                    slidesPerView={2}
                    breakpoints={{
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
                      : null}
                  </Swiper>
                  {/* <button className="absolute top-[50%] -right-5 z-50 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <BsArrowRight />
                  </button> */}
                </div>
              </section>
              <section className="mb-32">
                <div className="section-header w-full flex justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold">
                      Top tracks this month
                    </h3>
                    <p className="text-md mt-3 text-white/50">
                      Only visible to you
                    </p>
                  </div>
                  <a href="#" className="uppercase">
                    View all
                  </a>
                </div>
                <div className="section-list grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col gap-3 items-start my-3">
                  {top_tracks &&
                    top_tracks.items.slice(0, 12).map((track, i) => {
                      return (
                        <TrackList track={track} setGradient={setGradient} />
                      );
                    })}
                </div>
              </section>

              <section className="mb-32">
                <div className="section-header w-full flex justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold">
                      Public Playlists
                    </h3>
                  </div>
                  {/* <a href="#" className="uppercase">
                    View all
                  </a> */}
                </div>
                <div className="section-list flex flex-col gap-3 items-start my-3">
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
                    {playlists
                      ? playlists.items
                          .filter((item) => item.owner.id === user.spotify_id)
                          .map((item, i) => {
                            console.log("Item=>", item);
                            return (
                              <SwiperSlide>
                                {" "}
                                <SectionItem
                                  cover={
                                    item.images.length
                                      ? item.images[0].url
                                      : false
                                  }
                                  title={item.name}
                                  setGradient={setGradient}
                                  type="artist"
                                  item={item}
                                />
                              </SwiperSlide>
                            );
                          })
                      : null}
                  </Swiper>
                </div>
              </section>

              <section className="mb-32">
                <div className="section-header w-full flex justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold">
                      Followings
                    </h3>
                  </div>
                  <a href="#" className="uppercase">
                    View all
                  </a>
                </div>
                <div className="section-list flex flex-col gap-3 items-start my-3">
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
                    slidesPerView={2}
                    breakpoints={{
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
                    {following
                      ? following.map((item, i) => {
                          console.log("Item=>", item);
                          return (
                            <SwiperSlide>
                              {" "}
                              <SectionItem
                                cover={
                                  item.images.length
                                    ? item.images[0].url
                                    : false
                                }
                                title={item.name}
                                setGradient={setGradient}
                                type="artist"
                                item={item}
                              />
                            </SwiperSlide>
                          );
                        })
                      : null}
                  </Swiper>
                </div>
              </section>
            </div>
          </div>
        </Content>
        {profile_form && (
          <EditProfileForm
            user={u ? u : null}
            setProfileForm={setProfileForm}
            setUser={setUser}
            setUserData={setUserData}
          />
        )}
      </Layout>
      {user && <Player />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile_form: state.appReducer.profile_form,
  user: state.appReducer.user,
  artists: state.appReducer.artists,
  top_tracks: state.appReducer.top_tracks,
  playlists: state.appReducer.playlists,
});

const mapDispatchToProps = (dispatch) => ({
  setProfileForm: (profile_form) =>
    dispatch({ type: "SET_PROFILE_FORM", profile_form }),
  setUser: (user) => dispatch({ type: "SET_USER", user }),
  setTopTracks: (top_tracks) => dispatch(setTopTracks(top_tracks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
