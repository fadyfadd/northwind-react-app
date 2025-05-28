import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserProfileDto } from "../data-transfer-object/user-profile-dto";
 

let initialState: UserProfileDto = {
 
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (
      state: UserProfileDto,
      action: PayloadAction<UserProfileDto>
    ) => {
      return { ...action.payload };
    },
    logout: (state: UserProfileDto) => {     
       
      return {
         
      };
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
