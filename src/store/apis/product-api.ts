import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductDto } from "../../data-transfer-object/product-dto";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_NORTHWIND_API }),
  endpoints: (builder) => ({    
    getProducts: builder.query<ProductDto[] , void>({query:()=>`Product/All`}),
    getProductByid: builder.query<ProductDto, number>({
      query: (id) => `${id}`,
    }),
  }),  
});

export const {useGetProductByidQuery , useGetProductsQuery} = productApi;
