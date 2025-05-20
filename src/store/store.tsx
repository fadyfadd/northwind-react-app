import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication-slice";

export const store = configureStore({
  reducer: {
    authentication: authentication,
  },
});

export type RootState = ReturnType<typeof store.getState>;
