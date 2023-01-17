import React from "react";
import { FaPlay } from "react-icons/fa";
import toast from "react-hot-toast";
import GetPlaylistTracks from "../../utils/get_playlist_tracks";
import playSong from "../../utils/Play_song";
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

function OfflineBanner({ setBanner, offline_banner }) {
  const [isRendered, setIsRendered] = React.useState(false);
  const [tracks, setTracks] = React.useState(null);
  const [play, setPlay] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState(0);
  const [audio, setAudio] = React.useState(new Audio());

  React.useEffect(() => {
    setIsRendered(true);
    async function getPlaylistTracks() {
      const tracks_response = await GetPlaylistTracks(
        offline_banner.playlist_id
      );
      const items = tracks_response.items.map((item) => item.track.preview_url);
      setTracks(items);
    }
    getPlaylistTracks();

    audio.onended = () => {
      nextSong();
    };
  }, []);
  const handleClose = (e) => {
    console.log(e.target);
    const class_list = e.target.classList;
    if (class_list.contains("offline-banner-backdrop")) {
      setBanner(false);
    }
    setAudio(null);
  };
  const handlePlay = () => {
    audio.src = tracks && tracks[currentSong];
    audio.play();
  };

  const nextSong = () => {
    setCurrentSong(currentSong + 1);
    if (currentSong > tracks?.length) {
      setCurrentSong(0);
    }
    handlePlay();
  };

  const isPlayed = () => {
    if (audio.paused) {
      audio.src = tracks[currentSong];
      audio.play();
      setPlay(true);
    } else {
      console.log("Pausing");
      audio.pause();
      setPlay(false);
    }
  };

  console.log(currentSong);
  return (
    <div
      className="cursor-pointer offline-banner-backdrop bg-black/40 absolute w-full h-screen top-0 z-40 flex items-center justify-center backdrop-blur-xl"
      onClick={handleClose}
    >
      <div
        className={`${
          isRendered ? "scale-110 opacity-1" : "scale-100 opacity-0"
        } offline_modal  py-12 px-12 flex rounded-xl gap-16 transition-all`}
        style={{
          backgroundColor: hexToRgbA(offline_banner.color),
        }}
      >
        <div className="offline_cover w-[250px] h-[250px] flex items-center justify-center group">
          <img
            src={offline_banner.cover}
            alt=""
            className="w-full h-full object-cover rounded-md shadow-2xl"
          />
          <button
            className="absolute z-10 w-12 h-12 bg-green-500 scale-0 flex items-center justify-center rounded-full shadow-md group-hover:scale-100 transition-all"
            onClick={isPlayed}
          >
            <FaPlay />
          </button>
        </div>
        <div className="offline_headers">
          <h2 className="text-3xl text-white w-[320px] leading-12 font-bold">
            Start listening with a free Spotify account
          </h2>
          <div className="flex items-center justify-center mt-12">
            <a
              href="http://localhost:5001/login"
              className="flex px-2 py-2 bg-green-500 w-full rounded-full items-center justify-center text-white font-bold"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfflineBanner;
