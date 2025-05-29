import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ScreenState = {
  isLoaderActive: boolean;
  message: string | null;
};

const initialState: ScreenState = {
  isLoaderActive: false,
  message: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    handleProgressIndicator: (
      state: ScreenState,
      action: PayloadAction<boolean>
    ) => {
      state.isLoaderActive = action.payload;
    },
    handleApplicationWideMessage(
      state: ScreenState,
      action: PayloadAction<string | null>
    ) {
      state.message = action.payload;
    },
  },
});

export const { handleProgressIndicator , handleApplicationWideMessage } = uiSlice.actions;

export default uiSlice.reducer;
