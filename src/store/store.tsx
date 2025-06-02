import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication-slice";
import { productApi } from "./apis/product-api";
import { userApi } from "./apis/user-api";
import uiReducer from './ui-slice'
import { supplierApi } from "./apis/supplier-apis";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    ui: uiReducer,    
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [supplierApi.reducerPath] : supplierApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware , userApi.middleware , supplierApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
