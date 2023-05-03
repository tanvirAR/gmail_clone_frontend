import { apiSlice } from "../api/apiSlice";

export const sentMailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSentMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/sent",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),


  }),
});

export const { useGetSentMailsQuery } = sentMailApi;
