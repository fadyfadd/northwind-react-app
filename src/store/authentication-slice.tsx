import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../role";

export type UserProfile = {
  isAuthenticated: boolean;
  userName: string | null;
  role: Role | null;
};

let initialState: UserProfile = {
  isAuthenticated: false,
  userName: null,
  role: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state: UserProfile, action: PayloadAction<UserProfile>) => {
      state = { ...action.payload };
    },
    logout: (state: UserProfile) => {
      state.isAuthenticated = false;
      state.userName = null;
      state.role = null;
    },
  },
});

export const {login , logout} =  authenticationSlice.actions;

export default authenticationSlice.reducer

