import { create } from "zustand";
import { Songs } from "@/types";
/**
 * @typedef {Object} PlayerStore
 * @property {Songs|null} currentSong
 * @property {boolean} isPlaying
 * @property {Array<Songs>} queue
 * @property {number} currentIndex
 * @property {(songs: Array<Songs>) => void} initializeQueue
 * @property {(songs: Array<Songs>, startIndex?: number) => void} playAlbum
 * @property {(song: Songs|null) => void} setCurrentSong
 * @property {() => void} togglePlay
 * @property {() => void} playNext
 * @property {() => void} playPrevious
 */

/** @type {import('zustand').StateCreator<PlayerStore>} */
export const usePlayerStore = create((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  /**
   * @param {Array<Songs>} songs
   */
  initializeQueue: (songs) => {
    const state = get();
    set({
      queue: songs,
      currentSong: state.currentSong || songs[0],
      currentIndex: state.currentIndex === -1 ? 0 : state.currentIndex,
    });
  },

  /**
   * @param {Array<Songs>} songs
   * @param {number} [startIndex=0]
   */
  playAlbum: (songs, startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  /**
   * @param {Songs|null} song
   */
  setCurrentSong: (song) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s.id === song.id);

    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;

    set({
      isPlaying: willStartPlaying,
    });
  },

  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      // Không còn bài tiếp theo
      set({ isPlaying: false });
    }
  },

  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else {
      // Không còn bài trước đó
      set({ isPlaying: false });
    }
  },
}));
