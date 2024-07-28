import { createContext, useRef, useState } from "react";
import { songsData } from "../assets/assets";


export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioref = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioref.current.play()
    setPlayStatus(true)
  };

  const pause = () => {
    audioref.current.pause();
    setPlayStatus(false);
  };

  const contextValue = {
    audioref,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,pause 
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
