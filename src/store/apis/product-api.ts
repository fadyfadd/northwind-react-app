import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductDto } from "../../data-transfer-object/product-dto";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5251" }),
  endpoints: (builder) => ({    
    getProducts: builder.query<ProductDto[] , void>({query:()=>`All`}),
    getProductByid: builder.query<ProductDto, number>({
      query: (id) => `${id}`,
    }),
  }),  
});

export const {useGetProductByidQuery , useGetProductsQuery} = productApi;
