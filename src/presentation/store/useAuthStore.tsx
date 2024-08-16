import { create } from "zustand";
import "firebase/firebase-auth";

interface userStore {
  user: string;
  logout: () => void;
}

const useAuthStore = create<userStore>()((set) => ({
  user: "",
  setUser: (user: string) => set({ user }),
  logout: () => set({ user: "" }),
}));
