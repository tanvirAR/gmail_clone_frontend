import { readMailInterface } from "../../interface/readMail.interface";
import { apiSlice } from "../api/apiSlice";

export const moveEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    moveFromSentToInbox: builder.mutation({
      query: (mailId: readMailInterface) => ({
        url: "/email/move/sent/to/inbox",
        method: "PATCH",
        body: JSON.stringify(mailId),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    moveFromSpamToInbox: builder.mutation({
      query: (mailId: readMailInterface) => ({
        url: "/email/move/spam/to/inbox",
        method: "PATCH",
        body: JSON.stringify(mailId),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    moveFromTrashToInbox: builder.mutation({
      query: (mailId: readMailInterface) => ({
        url: "/email/move/trash/to/inbox",
        method: "PATCH",
        body: JSON.stringify(mailId),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useMoveFromSentToInboxMutation,
  useMoveFromSpamToInboxMutation,
  useMoveFromTrashToInboxMutation,
} = moveEmailApi;
