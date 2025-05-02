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
 * @property {(songId: string, isFavorite: boolean) => Promise<void>} toggleFavoriteSong
 * @property {() => Promise<void>} fetchFavoriteSongs
 * @property {boolean} isFavorite
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
  myAlbums: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },
  favoriteSongs: [],
  isFavorite: false,

  fetchMyAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums/user/");
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
      await axiosInstance.delete(`/admin/songs/${id}`);

      set((state) => ({
        songs: state.songs.filter((song) => song.id !== id),
      }));
      toast.success("Song deleted successfully");
    } catch (error) {
      console.log("Error in deleteSong", error);
      toast.error("Error deleting song");
    } finally {
      set({ isLoading: false });
    }
  },
  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/albums/${id}/`);
      set((state) => ({
        albums: state.albums.filter((album) => album.id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a.id === id)?.title
            ? { ...song, album: null }
            : song
        ),
      }));
      toast.success("Album deleted successfully");
    } catch (error) {
      toast.error("Failed to delete album: " + error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs");
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
      const response = await axiosInstance.get("/stats");
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

  toggleFavoriteSong: async (songId, isFavorite) => {
    try {
      if (isFavorite) {
        // Xóa khỏi yêu thích
        await axiosInstance.delete("/songs/favorite/", { data: { song_id: songId } });
        set({
          isFavorite: false,
        });
        toast.success("Đã xóa khỏi yêu thích");
      } else {
        // Thêm vào yêu thích
        await axiosInstance.post("/songs/favorite/", { song_id: songId });
        set({
          isFavorite: true,
        });
        toast.success("Đã thêm vào yêu thích");
      }
      // Sau khi cập nhật, có thể gọi lại fetchFavoriteSongs nếu muốn đồng bộ
    } catch (error) {
      toast.error(error.response?.data?.error || "Lỗi thao tác yêu thích");
    }
  },

  fetchFavoriteSongs: async () => {
    try {
      const response = await axiosInstance.get("/songs/favorite/list/");
      set({ favoriteSongs: response.data });
    } catch (error) {
      toast.error("Không thể lấy danh sách yêu thích");
    }
  },
}));
