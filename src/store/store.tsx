import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication-slice";
import { productApi } from "./apis/product-api";

export const store = configureStore({
  reducer: {
    authentication: authentication,
    [productApi.reducerPath]:productApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
