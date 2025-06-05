import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductDto } from "../../data-transfer-object/product-dto";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_NORTHWIND_API,
  }),
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    saveOrUpdateProduct: builder.mutation<ProductDto, ProductDto>({
      query: (product: ProductDto) => ({
        url: "Product/SaveOrUpdate",
        method: "post",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    getProducts: builder.query<ProductDto[], void>({
      query: () => `Product/All`,
      providesTags: ["Products"],
    }),
    getProductByid: builder.query<ProductDto, number>({
      query: (id) => `Product/${id}`,
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductByidQuery,
  useGetProductsQuery,
  useSaveOrUpdateProductMutation,
} = productApi;
