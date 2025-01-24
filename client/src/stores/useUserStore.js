import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios.js";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user, loading: false });
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Something went wrong");
    }
  },
  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
}));
