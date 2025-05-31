import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
import { UserProfileDto } from "../../data-transfer-object/user-profile-dto";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl:process.env.REACT_APP_API_NORTHWIND_API }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<
      UserProfileDto,
      { userName: string | undefined; password: string | undefined }
    >({
      query: ({ userName, password }) => ({
        url: "User/Login",
        method: "post",
        body: {"userName":userName , "password":password},
      }),
    }),
  }),
});

export const { useGetUserProfileQuery , useLazyGetUserProfileQuery } = userApi;
