import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SupplierDto } from "../../data-transfer-object/supplier-dto";

export const supplierApi = createApi({
  reducerPath: "supplierApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_NORTHWIND_API }),
  endpoints: (builder) => ({    
    getSuppliers: builder.query<SupplierDto[] , void>({query:()=>`Supplier/All`}),
    getSupplierByid: builder.query<SupplierDto, number>({
      query: (id) => `Supplier/${id}`,
    }),
}),  
});

export const {useGetSupplierByidQuery , useGetSuppliersQuery} = supplierApi;
