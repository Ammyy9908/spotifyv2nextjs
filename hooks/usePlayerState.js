import React, { useState, useCallback, useEffect } from "react";

function usePlayerState() {
  const [state, setPlayerState] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("playerState")) {
      setPlayerState(localStorage.getItem("playerState"));
    }
  }, [state]);
  return state;
}

export default usePlayerState;
