import { readMailInterface } from "../../interface/readMail.interface";
import { apiSlice } from "../api/apiSlice";

export const readEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markReadSingleMail: builder.mutation({
      query: (mailId: readMailInterface) => ({
        url: "/email/mark/read",
        method: "POST",
        body: JSON.stringify(mailId),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    markUnReadSingleMail: builder.mutation({
      query: (mailId: readMailInterface) => ({
        url: "/email/mark/unread",
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

export const {useMarkReadSingleMailMutation, useMarkUnReadSingleMailMutation} = readEmailApi;
