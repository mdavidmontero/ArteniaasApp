import { create } from "zustand";
import { User } from "../../domain/entities/user";
// import { getAuth, signOut } from "firebase/auth";
// const auth = getAuth();

interface userStore {
  user: User | null;
  setUser: (user: User | null) => void;
  // logout: () => Promise<void>;
}

export const useAuthStore = create<userStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  // logout: async () => {
  //   await signOut(auth);
  //   set({ user: null });
  // },
}));
