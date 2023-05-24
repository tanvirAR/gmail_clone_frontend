import { apiSlice } from "../api/apiSlice";

export const emailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markMailAsSnoozed: builder.mutation({
      query: (data: { mailId: string; time: string }) => ({
        url: "/email/mark/snoozed",
        method: "POST",
        body: JSON.stringify(data),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

   cancellSnoozeMail: builder.mutation({
      query: (data: { mailId: string }) => ({
        url: "/email/snooze/cancell",
        method: "POST",
        body: JSON.stringify(data),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    getAllSnoozedMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/snoozed",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // beforerefetch,  clear slice state data of selected mails in email slice and addtinal email data from additionalDataEmailSlice
        // dispatch(resetSelectedMails());
      },
    }),
  }),
});

export const { useGetAllSnoozedMailsQuery, useCancellSnoozeMailMutation, useMarkMailAsSnoozedMutation } =
  emailApi;
