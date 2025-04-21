import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

/**
 * @typedef {Object} ChatStore
 * @property {any[]} users
 * @property {() => Promise<void>} fetchUsers
 * @property {boolean} isLoading
 * @property {string|null} error
 */

/** @type {import('zustand').StateCreator<ChatStore>} */
export const useChatStore = create((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
