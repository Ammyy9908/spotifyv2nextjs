const intialState = {
  user: null,
  publicData: null,
  playlists: null,
  offline_banner: false,
  artists: null,
  recents: false,
  isPlaying: false,
  playerState: null,
  currentWindow: "Home",
  shows: null,
  device_popup: false,
  profile_form: false,
  top_tracks: null,
};

const AppReducer = (state = intialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_TOP_TRACKS":
      return {
        ...state,
        top_tracks: action.top_tracks,
      };

    case "SET_PROFILE_FORM":
      return {
        ...state,
        profile_form: action.profile_form,
      };

    case "SET_DEVICE_POPUP":
      return {
        ...state,
        device_popup: action.device_popup,
      };

    case "SET_SHOWS":
      return {
        ...state,
        shows: action.shows,
      };

    case "SET_WINDOW":
      return {
        ...state,
        currentWindow: action.window,
      };

    case "SET_PLAYER_STATE":
      return {
        ...state,
        playerState: action.playerState,
      };

    case "SET_PLAYING":
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case "SET_ARTISTS":
      return {
        ...state,
        artists: action.artists,
      };

    case "SET_BANNER":
      return {
        ...state,
        offline_banner: action.banner,
      };
    case "SET_RECENTS":
      return {
        ...state,
        recents: action.recents,
      };
    case "SET_PUBLIC_DATA":
      return {
        ...state,
        publicData: action.publicData,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

export default AppReducer;
