import React from "react";
import { AiOutlineHeart, AiOutlineExpandAlt } from "react-icons/ai";
import { BiShuffle, BiChevronUp } from "react-icons/bi";
import { GiPreviousButton, GiNextButton, GiMicrophone } from "react-icons/gi";
import { IoPause, IoPlay } from "react-icons/io5";
import { MdReplay, MdQueueMusic, MdDevices } from "react-icons/md";
import { connect } from "react-redux";
import usePlayerState from "../../hooks/usePlayerState";
import { setPlaying } from "../../redux/actions/_appActions";
import getCurrentTrack from "../../utils/getCurrentTrack";
import pausePlayer from "../../utils/pause_player";
import resumePlayer from "../../utils/resumePlayer";
function Player({ isPlaying, setPlaying }) {
  const player_state = usePlayerState();

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      // When local storage changes, dump the list to
      // the console.
      console.log(JSON.parse(window.localStorage.getItem("playerState")));
    });
  }, []);

  console.log("Player State: " + player_state);
  const handlePause = async () => {
    await pausePlayer();
    setPlaying(false);
  };

  const handleResume = async () => {
    getCurrentTrack().then((d) => console.log(d));
    await resumePlayer();
    setPlaying(true);
  };
  return (
    <div
      className="absolute bottom-0
   left-0 right-0 bg-black/90 backdrop-blur w-full px-6 z-10 py-3 shadow-xl flex items-center justify-between"
    >
      <div className="player__left flex items-center gap-8 text-white">
        <div className="player-album flex items-center gap-3">
          <div className="cursor-pointer group player__album_thumb w-12 h-12 bg-gray-300 relative">
            <img
              src="https://i.scdn.co/image/ab67616d00004851940dc585cdb2fedbd28c5aec"
              alt="player_track_cover"
              className="w-full h-full object-cover"
              id="track_cover"
            />
            <div className="transition-all hidden items-center justify-center  group-hover:flex album_cover_expand_btn w-6 rounded-full cursor-pointer h-6 bg-gray-400 absolute top-1 right-1">
              <BiChevronUp />
            </div>
          </div>
          <div className="player__album__info">
            <h2 className="text-md" id="track_name">
              26 Blvd
            </h2>
            <p className="text-xs" id="artist_name">
              Prem dhillon
            </p>
          </div>
        </div>
        <div className="player_action">
          <button className=" transition-all w-8 h-8 text-xl hover:bg-green-400 flex items-center justify-center rounded-full">
            <AiOutlineHeart />
          </button>
        </div>
      </div>
      <div className="player__center">
        <div className="player__center__controls text-white text-2xl flex items-center gap-3">
          <button className="w-8 h-8 text-xl">
            <BiShuffle />
          </button>
          <button className="w-8 h-8 text-xl">
            <GiPreviousButton />
          </button>
          <button
            className="w-8 h-8 text-xl bg-white rounded-full flex items-center justify-center text-black"
            onClick={!isPlaying ? handleResume : handlePause}
          >
            {!isPlaying ? <IoPlay /> : <IoPause />}
          </button>
          <button className="w-8 h-8 text-xl">
            <GiNextButton />
          </button>
          <button className="w-8 h-8 text-xl">
            <MdReplay />
          </button>
        </div>
      </div>
      <div className="player__right text-white">
        <button className="w-8 h-8 text-xl">
          <GiMicrophone />
        </button>
        <button className="w-8 h-8 text-xl">
          <MdQueueMusic />
        </button>
        <button className="w-8 h-8 text-xl">
          <MdDevices />
        </button>
        <button className="w-8 h-8 text-xl">
          <AiOutlineExpandAlt />
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isPlaying: state.appReducer.isPlaying,
});

const mapDispatchToProps = (dispatch) => ({
  setPlaying: (isPlaying) => dispatch(setPlaying(isPlaying)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
