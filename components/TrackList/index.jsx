import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { connect } from "react-redux";
import { setPlayerState, setPlaying } from "../../redux/actions/_appActions";
import getCurrentTrack from "../../utils/getCurrentTrack";
import getExtractedColors from "../../utils/getExtratedColors";
import pausePlayer from "../../utils/pause_player";
import playSong from "../../utils/Play_song";
import resumePlayer from "../../utils/resumePlayer";

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",.6)"
    );
  }
  throw new Error("Bad Hex");
}

function TrackList({
  track,
  playerState,
  setPlaying,
  setPlayerState,
  isPlaying,
  setGradient,
}) {
  const [colors, setColors] = React.useState(null);
  React.useEffect(() => {
    getExtractedColors(track.album.images[0].url)
      .then((d) => {
        setColors(d.data.extractedColors);
      })
      .catch((e) => console.log(e));
  }, []);

  const getFormattedDuration = () => {
    var ms = track.duration_ms,
      min = Math.floor((ms / 1000 / 60) << 0),
      sec = Math.floor((ms / 1000) % 60);

    return min + ":" + sec;
  };

  const handlePlay = async () => {
    playSong(track.uri).then(async () => {
      setPlaying(true);
      const state = await getCurrentTrack();

      setPlayerState(track.id);
    });
  };

  const handlePause = async () => {
    await pausePlayer();
    setPlaying(false);
  };

  const handleResume = async () => {
    await resumePlayer();
    setPlaying(true);
  };
  return (
    <div
      className="group track-list flex md:flex-row flex-col items-start md:items-center justify-between w-full hover:bg-white/30 px-3 py-2 rounded-md cursor-pointer transition-all"
      onMouseOver={() =>
        colors
          ? setGradient(hexToRgbA(colors[0].colorDark.hex))
          : setGradient("#333333")
      }
    >
      <div className="track-list-left flex md:flex-row flex-col items-start md:items-center gap-3">
        <div className="relative w-full h-full md:w-12 md:h-12 bg-gray-400">
          <img
            src={track.album.images[0].url}
            alt="track-cover"
            className="w-full h-full object-cover"
          />
          <button
            className="transition-all bg-green-500 group-hover:scale-100 w-12 h-12 bottom-2 right-2 rounded-full md:rounded-none scale-0 absolute md:inset-0 flex items-center justify-center"
            onClick={
              playerState !== track.id
                ? handlePlay
                : !isPlaying
                ? !playerState
                  ? handlePlay
                  : handleResume
                : handlePause
            }
          >
            {playerState === track.id && isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
        <div>
          <h3>
            {track.name.length > 15
              ? track.name.slice(0, 15) + "..."
              : track.name}
          </h3>
          <p className="text-sm text-white/50">
            {track.artists[0].name.length > 15
              ? track.artists[0].name.slice(0, 15) + "..."
              : track.artists[0].name}
          </p>
        </div>
      </div>
      <div className="md:flex track-list-right md:w-[400px]  hidden items-center justify-between gap-32">
        <div>
          <p>
            {track.album.name.length > 15
              ? track.album.name.slice(0, 10) + "..."
              : track.album.name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span>
            <FiHeart />
          </span>
          <span>{getFormattedDuration()}</span>
          <button>
            <FiMoreHorizontal />
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  playerState: state.appReducer.playerState,
  isPlaying: state.appReducer.isPlaying,
});
const mapDispatchToProps = (dispatch) => ({
  setPlaying: (isPlaying) => dispatch(setPlaying(isPlaying)),
  setPlayerState: (playerState) => dispatch(setPlayerState(playerState)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
