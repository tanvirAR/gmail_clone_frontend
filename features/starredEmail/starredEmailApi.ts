import { apiSlice } from "../api/apiSlice";

export const starredEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStarredMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/starred",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    markMailAsStarred: builder.mutation({
      query: (mailId: string) => ({
        url: `/email/mark/starred/${mailId}`,
        method: "POST",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetStarredMailsQuery, useMarkMailAsStarredMutation } = starredEmailApi;
