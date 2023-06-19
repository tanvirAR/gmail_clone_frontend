import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";


const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:9000",
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result  = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      api.dispatch(logout())
    }
    return result as any;
  },
  tagTypes: ["snoozedMails"],
  endpoints: (builder) => ({}),
});
