import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
import { UserProfileDto } from "../../data-transfer-object/user-profile-dto";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5251" }),
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
