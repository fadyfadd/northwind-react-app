import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication-slice";
import { productApi } from "./apis/product-api";
import { userApi } from "./apis/user-api";
import uiReducer from './ui-slice'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    ui: uiReducer,    
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware , userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
