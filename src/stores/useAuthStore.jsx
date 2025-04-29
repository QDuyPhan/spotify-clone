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
      const response = await axiosInstance.get("/admin/check/");
      console.log("Check admin response:", response.data);

      set({ isAdmin: response.data.admin }); // Đảm bảo key khớp với response backend
    } catch (error) {
      console.error("Error checking admin status:", error.response?.data);
      set({
        isAdmin: false,
        error: error.response?.data?.error || "Failed to check admin status",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
