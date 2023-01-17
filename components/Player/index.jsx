import React from "react";
import { AiOutlineHeart, AiOutlineExpandAlt } from "react-icons/ai";
import { BiShuffle, BiChevronUp, BiDownArrow } from "react-icons/bi";
import { GiPreviousButton, GiNextButton, GiMicrophone } from "react-icons/gi";
import { IoPause, IoPlay } from "react-icons/io5";
import { MdReplay, MdQueueMusic, MdDevices, MdClear } from "react-icons/md";
import { connect } from "react-redux";
import usePlayerState from "../../hooks/usePlayerState";
import { setDevicePopup, setPlaying } from "../../redux/actions/_appActions";
import changeVolume from "../../utils/change-volumne";
import getCurrentTrack from "../../utils/getCurrentTrack";
import pausePlayer from "../../utils/pause_player";
import playNext from "../../utils/playNext";
import playPrev from "../../utils/playPrev";
import resumePlayer from "../../utils/resumePlayer";
import DevicePopUp from "../DevicePopUp";
import HighAudioIcon from "../Icons/HighAudioIcon";
import LowAudioIcon from "../Icons/LowAudioIcon";
import MediumSoundIcon from "../Icons/MediumSoundIcon";
import MuteIcon from "../Icons/MuteIcon";
function Player({ isPlaying, setPlaying, setPopup, device_popup }) {
  const [volume, setVolume] = React.useState(0);
  const handlePause = async () => {
    await pausePlayer();
    setPlaying(false);
  };

  const handleResume = async () => {
    getCurrentTrack().then((d) => console.log(d));
    await resumePlayer();
    setPlaying(true);
  };

  const handleNext = async () => {
    await playNext();
  };

  const handleprevious = async () => {
    await playPrev();
  };

  const handleVolume = async (e) => {
    setVolume(e.target.value);
    await changeVolume(e.target.value);
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
              .
            </h2>
            <p className="text-xs" id="artist_name">
              ...
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
          <button className="w-8 h-8 text-xl" onClick={handleprevious}>
            <GiPreviousButton />
          </button>
          <button
            className="w-8 h-8 text-xl bg-white rounded-full flex items-center justify-center text-black"
            onClick={!isPlaying ? handleResume : handlePause}
          >
            {!isPlaying ? <IoPlay /> : <IoPause />}
          </button>
          <button className="w-8 h-8 text-xl" onClick={handleNext}>
            <GiNextButton />
          </button>
          <button className="w-8 h-8 text-xl">
            <MdReplay />
          </button>
        </div>
      </div>
      <div className="player__right text-white flex items-center gap-2">
        <button className="w-8 h-8 text-xl">
          <GiMicrophone />
        </button>
        <button className="w-8 h-8 text-xl">
          <MdQueueMusic />
        </button>
        <button
          className="w-8 h-8 text-xl relative"
          onClick={(e) => {
            setPopup(!device_popup);
          }}
        >
          <MdDevices />
        </button>
        <div className="volume-control  flex items-center gap-2">
          {volume < 1 && <MuteIcon />}
          {volume < 15 && volume > 0 && <LowAudioIcon />}
          {volume > 15 && volume < 65 && <MediumSoundIcon />}
          {volume > 65 && <HighAudioIcon />}
          <input
            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-2 w-128"
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={handleVolume}
          />
        </div>
        <button className="w-8 h-8 text-xl">
          <AiOutlineExpandAlt />
        </button>
      </div>
      <DevicePopUp />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isPlaying: state.appReducer.isPlaying,
  device_popup: state.appReducer.device_popup,
});

const mapDispatchToProps = (dispatch) => ({
  setPlaying: (isPlaying) => dispatch(setPlaying(isPlaying)),
  setPopup: (device_popup) => dispatch(setDevicePopup(device_popup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
