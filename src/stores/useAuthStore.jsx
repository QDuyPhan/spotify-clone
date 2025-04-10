import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

/**
 * @typedef {Object} AuthStore
 * @property {boolean} isAdmin
 * @property {boolean} isLoading
 * @property {string|null} error
 * @property {() => Promise<void>} checkAdminStatus
 * @property {() => void} reset
 */

/** @type {import('zustand').StateCreator<AuthStore>} */
export const useAuthStore = create((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response.data.admin });
    } catch (error) {
      set({
        isAdmin: false,
        error: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
