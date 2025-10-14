import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileObj {
  access_token: string;
  id_token?: string;
  refresh_token?: string;
  usercid: string;
  name: string;
  email: string;
  appUserLoggedin: boolean;
}

interface AuthState {
  userType: string;
  isSuperAdmin: boolean;
  appUserLoggedin: boolean;
  userPerms: {
    admin: string[];
    readonly: string[];
    dev: string[];
    current_org: string;
    primary_org: string;
  } | null;
  imageUrl: string;
  profileObj: ProfileObj | null;
  isAppPage: boolean;

  setUserData: (userData: Partial<AuthState>) => void;
  setProfile: (profile: ProfileObj | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userType: '',
      isSuperAdmin: false,         
      appUserLoggedin: false,
      userPerms: null,
      imageUrl: "",
      profileObj: null,
      isAppPage: false,

      setUserData: (userData) => {
        set((state) => ({ ...state, ...userData }));
      },

      setProfile: (profile) => set({ profileObj: profile }),

      clearAuth: () => {
        set({
          userType: '',
          isSuperAdmin: false,
          appUserLoggedin: false,
          userPerms: null,
          imageUrl: "",
          profileObj: null,
          isAppPage: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
