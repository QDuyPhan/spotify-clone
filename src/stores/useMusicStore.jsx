import { create } from "zustand";

import React from "react";
import { axiosInstance } from "@/lib/axios";
import { Albums, Songs } from "@/types";
/**
 * @typedef {Object} MusicStore
 * @property {Array<Songs>} songs
 * @property {Array<Albums>} albums
 * @property {boolean} isLoading
 * @property {string|null} error
 * @property {() => Promise<void>} fetchAlbums
 */
/** @type {import('zustand').StateCreator<MusicStore>} */
export const useMusicStore = create((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message || "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
