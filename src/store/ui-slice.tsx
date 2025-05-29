import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ScreenState = {
  isLoaderActive: boolean;
  message: {
    value: string | null;
    type: "error" | "info" | "success" | "warning";
  };
};

const initialState: ScreenState = {
  isLoaderActive: false,
  message: { value: null, type: "warning" },
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
      action: PayloadAction<{
        value: string | null;
        type: "error" | "info" | "success" | "warning";
      }>
    ) {
      state.message = action.payload;
    },
  },
});

export const { handleProgressIndicator, handleApplicationWideMessage } =
  uiSlice.actions;

export default uiSlice.reducer;
