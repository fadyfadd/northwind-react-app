import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication-slice";
import { productApi } from "./apis/product-api";
import { userApi } from "./apis/user-api";

export const store = configureStore({
  reducer: {
    authentication: authentication,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware , userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
