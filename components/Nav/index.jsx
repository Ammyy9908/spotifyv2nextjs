import React from "react";
import { BiDownArrow } from "react-icons/bi";
import Cookies from "js-cookie";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { connect } from "react-redux";
import { toast } from "react-hot-toast";
import ShazamIcon from "../Icons/ShazamIcon";
import RecordAudio from "../../utils/record_audio";
import findTrack from "../../utils/findTrack";
import { setPlayerState, setPlaying } from "../../redux/actions/_appActions";
import playSong from "../../utils/Play_song";
import useNetwork from "../../hooks/useNetwork";
import OfflineIcon from "../Icons/OfflineIcon";
import { GiToaster } from "react-icons/gi";
function Nav({ scroll, user, color, setPlaying, setPlayerState }) {
  const [dropdown, setDropdown] = React.useState(false);
  const [SearchData, setSearchData] = React.useState(false);
  const [requestDone, setRequestDone] = React.useState(false);
  const network_status = useNetwork();

  console.log("network status", network_status);

  React.useEffect(() => {
    const getTrackFromMic = async () => {
      const track_data = await findTrack(
        `${SearchData.trackName} ${SearchData.artists}`
      );

      console.log("track data", track_data);
      const filtered = track_data?.tracks.items.find((song) =>
        song.artists.filter((artist) =>
          artist.name.toLowerCase().includes(SearchData.artists.toLowerCase())
        )
      );
      console.log("filtered", filtered);

      if (filtered) {
        playSong(filtered.uri).then(() => {
          setPlaying(true);
          setPlayerState(track_data.tracks.items[0].id);
        });
      }
    };
    if (SearchData) {
      console.log("Data aviable");
      getTrackFromMic();
    }
  }, [SearchData]);
  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("SPOTIFY_TOKEN");
    Cookies.remove("SPOTIFY_REFRESH_TOKEN");

    window.location.href = "/";
  };

  // handle microphone

  const handleRecordAudio = async () => {
    toast("Listening... 👂");
    setRequestDone(true);
    await RecordAudio(setSearchData, setRequestDone);
  };

  return (
    <nav
      className={`w-full py-2 navbar ${"bg-black/0"} sticky top-0 px-6 flex items-center justify-between z-20`}
      style={{
        backgroundColor: scroll > 55 && `${color}`,
      }}
    >
      <div className="nav__left flex items-center gap-3">
        <div className="nav_controls flex items-center gap-1">
          <button className="rounded-full w-8 h-8 bg-black/50 text-white flex items-center justify-center">
            <FiChevronLeft />
          </button>
          <button className="rounded-full w-8 h-8 bg-black/20 text-white flex items-center justify-center">
            <FiChevronRight />
          </button>
        </div>
        {/* <div className="nav__header flex items-center gap-2">
          <button className="w-10 h-10 bg-green-600 flex items-center justify-center rounded-full hover:shadow-2xl hover:scale-110">
            <FaPlay />
          </button>
          <h3 className="text-white text-xl font-semibold">Song Name</h3>
        </div> */}
      </div>
      <div className="nav__right flex gap-3 items-center">
        {user && (
          <button
            className={`w-[44px] h-[44px] shadow-2xl ${
              requestDone && "ping_loader"
            }`}
            onClick={
              !requestDone
                ? handleRecordAudio
                : () => {
                    toast("Please wait for previous request");
                  }
            }
          >
            <ShazamIcon />
          </button>
        )}
        {!network_status && (
          <div
            className="w-[32px] h-[32px] text-white rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#2e77d0",
            }}
          >
            <OfflineIcon />
          </div>
        )}
        {user ? (
          <div
            className="relative user__account__bar bg-black text-white rounded-full cursor-pointer"
            onClick={() => setDropdown(true)}
            tabIndex={0}
          >
            <div className="user__bar__box px-3 py-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-300">
                {user.images.length > 0 && (
                  <img
                    src={user.images[0].url}
                    alt={user.display_name}
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
              <div className="user_bar_controls flex items-center gap-2">
                <h3>{user.display_name}</h3>
                <span>
                  <BiDownArrow />
                </span>
              </div>
            </div>
            <ul
              className={`${
                dropdown ? "flex" : "hidden"
              } flex-col items-start gap-2 user_dropdown absolute bg-black/90 w-full top-12 px-2 py-4 rounded-md`}
            >
              <li className="hover:bg-white/50 py-1 flex px-1 rounded-md w-full ">
                <button>Account</button>
              </li>
              <li className="hover:bg-white/50 py-1 flex px-1 rounded-md w-full">
                <button>Profile</button>
              </li>
              <li className="hover:bg-white/50 py-1 flex px-1 rounded-md w-full">
                <button>Settings</button>
              </li>
              <li className="divider w-full h-[1px] bg-white"></li>
              <li className="hover:bg-white/50 py-1 flex px-1 rounded-md w-full">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <a
            href="http://localhost:5001/login"
            className="bg-white  px-2 w-[110px] py-2 flex items-center justify-center rounded-full shadow-2xl font-bold"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  setPlaying: (isPlaying) => dispatch(setPlaying(isPlaying)),
  setPlayerState: (playerState) => dispatch(setPlayerState(playerState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
