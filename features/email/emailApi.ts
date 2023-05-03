import { readMailInterface } from "../../interface/readMail.interface";
import sendMailReqBodyInterface from "../../interface/sendMailReqBody.interface";
import { resetInboxMailAdditionalData } from "../additionalEmailData/additionalEmailDataSlice";
import { apiSlice } from "../api/apiSlice";
import { resetInboxSelectedMails } from "./emailSlice";

export const emailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMail: builder.mutation({
      query: (data: sendMailReqBodyInterface) => ({
        url: "/email/sendmail",
        method: "POST",
        body: JSON.stringify(data),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    getAllMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // beforerefetch,  clear slice state data of selected mails in email slice and addtinal email data from additionalDataEmailSlice
        dispatch(resetInboxMailAdditionalData());
        dispatch(resetInboxSelectedMails());
      },
    }),
  }),
});

export const { useSendMailMutation, useGetAllMailsQuery } = emailApi;
