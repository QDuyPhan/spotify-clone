import { create } from "zustand";

import React from "react";
import { axiosInstance } from "@/lib/axios";
import { Albums, Songs, Stats } from "@/types";

/**
 * @typedef {Object} MusicStore
 * @property {Array<Songs>} songs
 * @property {Array<Albums>} albums
 * @property {boolean} isLoading
 * @property {string|null} error
 * @property {Albums|null} currentAlbum
 * @property {Stats|null} stats
 * @property {Array<Songs>} madeForYouSongs
 * @property {Array<Songs>} featureSongs
 * @property {Array<Songs>} trendingSongs
 * @property {() => Promise<void>} fetchAlbums
 * @property {(id: string) => Promise<void>} fetchAlbumsById
 * @property {() => Promise<void>} fetchFeaturedSongs
 * @property {() => Promise<void>} fetchMadeForYouSongs
 * @property {() => Promise<void>} fetchTrendingSongs
 * @property {() => Promise<void>} fetchStats
 * @property {() => Promise<void>} fetchSongs
 * @property {(id:string) => Promise<void>} deleteSong
 * @property {(id:string) => Promise<void>} deleteAlbum
 */
/** @type {import('zustand').StateCreator<MusicStore>} */
export const useMusicStore = create((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featureSongs: [],
  trendingSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

  deleteSong: async (id) => {},
  deleteAlbum: async (id) => {},
  fetchSongs: async () => {},
  fetchStats: async () => {},

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

  fetchAlbumsById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      console.log("fetchAlbumById: ", response);

      set({ currentAlbum: response.data });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featureSongs: response.data });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: response.data });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
