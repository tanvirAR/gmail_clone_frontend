
import  { sendScheduledMailInterface } from "../../interface/sendMailReqBody.interface";
import { apiSlice } from "../api/apiSlice";


export const emailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendScheduledMail: builder.mutation({
      query: (data: sendScheduledMailInterface) => ({
        url: "/email/sendmail/scheduled",
        method: "POST",
        body: JSON.stringify(data),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    // cancell a scheduled mail 
    cancellScheduledMail: builder.mutation({
      query: (emailId: string) => ({
        url: `/email/scheduled/cancell/${emailId}`,
        method: "DELETE",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    getAllScheduledMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/scheduled",
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

export const { useGetAllScheduledMailsQuery, useSendScheduledMailMutation, useCancellScheduledMailMutation } = emailApi;
