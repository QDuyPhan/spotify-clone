import { usePlayerStore } from "@/stores/usePlayerStore";
import React, { useEffect, useRef } from "react";

const AudioPlayer = () => {
  /** @type {React.RefObject<HTMLAudioElement>} */
  const audioRef = useRef(null);
  const prevSongRef = useRef(null);
  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // handle play/pause logic
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // handle song ends
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // handle song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    // check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audio_url;
    if (isSongChange) {
      audio.src = currentSong?.audio_url;
      // reset the playback position
      audio.currentTime = 0;

      prevSongRef.current = currentSong?.audio_url;

      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
