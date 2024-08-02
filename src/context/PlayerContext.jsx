import { createContext, useEffect, useRef, useState } from "react";
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
    audioref.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioref.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioref.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioref.current.play();
      setPlayStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioref.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = async (e) => {
    audioref.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioref.current.duration)

  }

  useEffect(() => {
    const updateTime = () => {
      seekBar.current.style.width = Math.floor(audioref.current.currentTime / audioref.current.duration * 100) + "%";
      setTime({
        currentTime: {
          second: Math.floor(audioref.current.currentTime % 60),
          minute: Math.floor(audioref.current.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audioref.current.duration % 60),
          minute: Math.floor(audioref.current.duration / 60),
        },
      });
    };

    audioref.current.addEventListener('timeupdate', updateTime);

    return () => {
      audioref.current.removeEventListener('timeupdate', updateTime);
    };
  }, [track]);

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
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
