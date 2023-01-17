import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoEnter } from "react-icons/io5";
import { connect } from "react-redux";
import { setPlayerState, setPlaying } from "../../redux/actions/_appActions";
import getExtractedColors from "../../utils/getExtratedColors";
import pausePlayer from "../../utils/pause_player";
import playArtist from "../../utils/playArtist";
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

function SectionItem({
  cover,
  title,
  type,
  setGradient,
  setBanner,
  user,
  setPlayerState,
  setPlaying,
  isPlaying,
  playerState,
  item,
}) {
  const [colors, setColors] = React.useState(null);
  React.useEffect(() => {
    getExtractedColors(cover)
      .then((d) => {
        setColors(d.data.extractedColors);
      })
      .catch((e) => console.log(e));
  }, []);

  const handlePlay = async () => {
    console.log("Playing song");
    setPlaying(true);
    await playArtist(type === "show" ? item.show.uri : item.uri);

    setPlayerState(type === "show" ? item.show.uri : item.uri);
  };

  const handlePause = async () => {
    await pausePlayer();
    setPlaying(false);
  };

  const handleResume = async () => {
    await resumePlayer();
    setPlaying(true);
  };

  const analyzePlayer = () => {
    let uri = type === "show" ? item.show.uri : item.uri;
    if (playerState !== uri) {
      handlePlay();
    } else if (isPlaying) {
      handlePause();
    } else {
      handleResume();
    }
  };

  return (
    <div
      className="w-full cursor-pointer  h-[215px] relative group overflow-hidden rounded-md shadow-2xl flex items-center justify-center bg-gray-300"
      onMouseOver={() =>
        colors
          ? setGradient(hexToRgbA(colors[0].colorDark.hex))
          : setGradient("#333333")
      }
    >
      {cover ? (
        <img
          src={cover}
          alt="section-item-thumb"
          className="transition-all group-hover:scale-110 section-item-image rounded-md absolute w-full h-full object-cover"
        />
      ) : (
        <svg
          role="img"
          height="64"
          width="64"
          aria-hidden="true"
          data-testid="card-image-fallback"
          viewBox="0 0 24 24"
          data-encore-id="icon"
          class="Svg-sc-ytk21e-0 uPxdw"
          fill="#ffffff"
        >
          <path d="M6 3h15v15.167a3.5 3.5 0 11-3.5-3.5H19V5H8v13.167a3.5 3.5 0 11-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 101.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 101.5 1.5v-1.5z"></path>
        </svg>
      )}
      <div
        className="section-item-footer  absolute z-10 backdrop-blur-xl  bottom-0 w-full h-[80px] transition-all rounded-l-b-md rounded-r-b-md opacity-0 group-hover:opacity-100"
        style={{
          backgroundColor: colors
            ? `${hexToRgbA(colors[0].colorDark.hex)}`
            : "#000000",
        }}
      >
        <div className="section-content mt-6 ml-2">
          <h2 className="font-bold text-white">{title}</h2>
          <p className="text-white text-sm">{type}</p>
        </div>
        <button
          className="flex section-item-play-btn absolute right-5 transition-all top-5 group-hover:-top-6 group-hover:shadow-2xl opacity-0 group-hover:opacity-100 rounded-full  items-center justify-center w-12 h-12 bg-green-500"
          onClick={() =>
            !user
              ? setBanner({
                  color: colors[0].colorDark.hex,
                  cover: cover,
                  playlist_id: item.uri.split(":")[2],
                })
              : analyzePlayer()
          }
        >
          {playerState == (type === "show" ? item.show.uri : item.uri) &&
          isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
  isPlaying: state.appReducer.isPlaying,
  playerState: state.appReducer.playerState,
});

const mapDispatchToProps = (dispatch) => ({
  setPlaying: (isPlaying) => dispatch(setPlaying(isPlaying)),
  setPlayerState: (playerState) => dispatch(setPlayerState(playerState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionItem);
