import { create } from "zustand";

import React from "react";
import { axiosInstance } from "@/lib/axios";
import { Albums, Songs, Stats } from "@/types";
import toast from "react-hot-toast";

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
 * @property {Array<Albums>} myAlbums
 * @property {() => Promise<void>} fetchMyAlbums
 * @property {() => Promise<void>} fetchSongsOfAlbum
 * @property {Array<Songs>} favoriteSongs
 * @property {(songId: string) => Promise<void>} toggleFavoriteSong
 * @property {() => Promise<void>} fetchFavoriteSongs
 */
/** @type {import('zustand').StateCreator<MusicStore>} */
export const useMusicStore = create((set, get) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featureSongs: [],
  trendingSongs: [],
  myAlbums: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },
  favoriteSongs: [],

  fetchMyAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("albums/user/");
      set({ myAlbums: response.data });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch your albums",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSong: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/songs/${id}/delete/`);

      if (response.data.message === "Song deleted successfully") {
        set((state) => ({
          songs: state.songs.filter((song) => song.id !== id),
        }));
        toast.success("Song deleted successfully");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to delete song";
      if (error.response?.status === 403) {
        toast.error("You do not have permission to delete this song");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      set({ isLoading: false });
    }
  },
  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/albums/${id}/delete/`);

      if (response.data.deleted_album_id) {
        set((state) => ({
          albums: state.albums.filter((album) => album.id !== id),
          songs: state.songs.filter((song) => song.albumId !== id),
        }));
        toast.success("Album and associated songs deleted successfully");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.details ||
        "Failed to delete album";
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("songs/");
      set({ songs: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("stats/");
      set({ stats: response.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("albums/");
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
      const response = await axiosInstance.get(`/albums/${id}/`);
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
      const response = await axiosInstance.get("songs/featured/");
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
      const response = await axiosInstance.get("songs/made-for-you/");
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
      const response = await axiosInstance.get("songs/trending/");
      set({ trendingSongs: response.data });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSongsOfAlbum: async (albumId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${albumId}/songs/`);
      set({ songs: response.data });
    } catch (error) {
      set({
        error:
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch songs of album",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  toggleFavoriteSong: async (songId) => {
    const state = get();
    const isFavorite = state.favoriteSongs.some((song) => song.id === songId);
    try {
      if (isFavorite) {
        await axiosInstance.delete("/songs/favorite/", {
          data: { song_id: songId },
        });
        set({
          favoriteSongs: state.favoriteSongs.filter(
            (song) => song.id !== songId
          ),
        });
        toast.success("Đã xóa khỏi yêu thích");
      } else {
        await axiosInstance.post("/songs/favorite/", { song_id: songId });
        const song = state.songs.find((s) => s.id === songId);
        if (song && !state.favoriteSongs.some((s) => s.id === songId)) {
          set({
            favoriteSongs: [...state.favoriteSongs, song],
          });
        }
        toast.success("Đã thêm vào yêu thích");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Lỗi thao tác yêu thích");
    }
  },

  fetchFavoriteSongs: async () => {
    try {
      const response = await axiosInstance.get("songs/favorite/list/");
      set({ favoriteSongs: response.data });
    } catch (error) {
      toast.error(
        "Không thể lấy danh sách yêu thích: ",
        error.response?.data?.error
      );
    }
  },
}));
