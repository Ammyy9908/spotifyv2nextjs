export const setOfflineData = (publicData) => ({
  type: "SET_PUBLIC_DATA",
  publicData,
});

export const setUser = (user) => ({
  type: "SET_USER",
  user,
});

export const setPlaylists = (playlists) => ({
  type: "SET_PLAYLISTS",

  playlists,
});

export const setBanner = (banner) => ({
  type: "SET_BANNER",

  banner,
});

export const setRecents = (recents) => ({
  type: "SET_RECENTS",

  recents,
});

export const setArtists = (artists) => ({
  type: "SET_ARTISTS",

  artists,
});

export const setPlaying = (isPlaying) => ({
  type: "SET_PLAYING",
  isPlaying,
});

export const setPlayerState = (playerState) => ({
  type: "SET_PLAYER_STATE",
  playerState,
});

export const setWindow = (window) => ({
  type: "SET_WINDOW",
  window,
});
