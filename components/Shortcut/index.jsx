import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { connect } from "react-redux";
import { setPlayerState, setPlaying } from "../../redux/actions/_appActions";
import getCurrentTrack from "../../utils/getCurrentTrack";
import getExtractedColors from "../../utils/getExtratedColors";
import pausePlayer from "../../utils/pause_player";
import playSong from "../../utils/Play_song";
import resumePlayer from "../../utils/resumePlayer";
function ShortcutItem({
  recent,
  setGradient,
  cover,
  item,
  setPlaying,
  setPlayerState,
  playerState,
  isPlaying,
}) {
  const [colors, setColors] = React.useState(null);
  const [menu, setMenu] = React.useState(false);
  console.log("Item=>", item);
  React.useEffect(() => {
    getExtractedColors(cover)
      .then((d) => {
        console.log(d);
        setColors(d.data.extractedColors);
      })
      .catch((e) => console.log(e));
  }, []);

  console.log(colors);

  const handlePlay = async () => {
    playSong(item.track.uri).then(async () => {
      setPlaying(true);
      const state = await getCurrentTrack();

      setPlayerState(item.track.id);
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
      className="bg-white/50 cursor-pointer flex items-center gap-2 rounded-md group backdrop hover:bg-white/70 transition-all relative"
      onMouseOver={() =>
        setGradient(colors?.length > 0 ? colors[0].colorDark.hex : "#000000")
      }
      onContextMenu={(e) => {
        console.log("You tried to open context menu");
        setMenu(!menu);
      }}
    >
      <div className="shortcut-left flex items-center gap-2">
        <div className="overflow-hidden shortcut-cover w-16 h-16 rounded-l-md">
          <img
            src={cover}
            alt={`${cover}__cover`}
            className="w-full h-full object-cover rounded-l-md group-hover:scale-110 transition-all"
          />
        </div>
      </div>
      <div className="shortcut_right flex items-center gap-2 justify-between flex-1 px-2">
        <h2 className="text-sm text-white font-bold">
          {recent.length > 15 ? recent.slice(0, 15) + "..." : recent}
        </h2>
        <button
          className={`w-12  items-center justify-center rounded-full h-12 shadow-xl bg-green-500 ${
            playerState === item.track.id ? "flex" : "hidden group-hover:flex"
          }`}
          onClick={
            playerState !== item.track.id
              ? handlePlay
              : !isPlaying
              ? !playerState
                ? handlePlay
                : handleResume
              : handlePause
          }
        >
          {playerState === item.track.id && isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </button>
      </div>

      {menu && (
        <div className="shortcut-context-menu absolute bg-gray-700 rounded px-2 py-2 -bottom-10 right-10 z-10">
          <ul className="flex flex-col gap-2 text-white">
            <li className="px-2 py-1 hover:bg-white/40 rounded">
              <button className="w-full">Go to playlist radio</button>
            </li>
            <li className="px-2 py-1 hover:bg-white/40 rounded">
              <button className="w-full">Add to your library</button>
            </li>
          </ul>
        </div>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShortcutItem);
