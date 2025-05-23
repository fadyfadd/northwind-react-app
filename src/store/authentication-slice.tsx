import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../role";

export type UserSecurityProfile = {
  isAuthenticated: boolean;
  userName: string | null;
  role: Role;
  token: string | null;
  refreshToken: string | null;
  tokenExpirationDate: Date | null;
};

let initialState: UserSecurityProfile = {
  isAuthenticated: false,
  userName: null,
  role: Role.Unknown,
  refreshToken: null,
  token: null,
  tokenExpirationDate: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (
      state: UserSecurityProfile,
      action: PayloadAction<UserSecurityProfile>
    ) => {
      return { ...action.payload };
    },
    logout: (state: UserSecurityProfile) => {     
       
      return {
        isAuthenticated: false,
        userName: null,
        role: Role.Unknown,
        refreshToken: null,
        token: null,
        tokenExpirationDate: null,
      };
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
