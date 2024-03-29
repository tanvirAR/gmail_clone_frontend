import { apiSlice } from "../api/apiSlice";

export const searchMailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchEmail: builder.query({
      query: (query: string) => ({
        url: `/email/search/${query}`,
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      /** not keeping any @cache so that user @always get the most @latest data */
      keepUnusedDataFor: 1
    }),
  }),
});

export const { useSearchEmailQuery } =
  searchMailApi;
