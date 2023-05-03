import { apiSlice } from "../api/apiSlice";

export const trashEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrashMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/trash",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    markTrashSingleInboxMail: builder.mutation({
      query: (mailId: string) => ({
        url: `/email/trash/${mailId}`,
        method: "POST",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetTrashMailsQuery, useMarkTrashSingleInboxMailMutation } =
  trashEmailApi;
