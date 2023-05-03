import { readMailInterface } from "../../interface/readMail.interface";
import { apiSlice } from "../api/apiSlice";

export const spamMailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpamMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/spam",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    markMailAsSpam: builder.mutation({
      query: (mailId: readMailInterface) => ({
        url: "/email/mark/spam",
        method: "POST",
        body: JSON.stringify(mailId),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetSpamMailsQuery, useMarkMailAsSpamMutation } = spamMailApi;
