import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9000",
  // baseUrl: " https://da17-45-248-151-227.ngrok-free.app",
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result  = await baseQuery(args, api, extraOptions);
    // if (result?.error?.status === 401) {
    //   window.location.reload();
    // }
    return result as any;
  },
  tagTypes: [],
  endpoints: (builder) => ({}),
});
