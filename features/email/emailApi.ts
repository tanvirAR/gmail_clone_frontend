import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import { readMailInterface } from "../../interface/readMail.interface";
import sendMailReqBodyInterface from "../../interface/sendMailReqBody.interface";
import { resetImportantMailAdditionalData, resetInboxMailAdditionalData, resetStarredMailAdditionalData } from "../additionalEmailData/additionalEmailDataSlice";
import { apiSlice } from "../api/apiSlice";
import { resetSelectedMails } from "./emailSlice";
import { inboxType, starredType, importantType } from "../../interface/EmailType";

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

    getAllMails: builder.query({
      query: (pageType: emailType) => ({
        url: "/email/getmails",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // beforerefetch,  clear slice state data of selected mails in email slice and addtinal email data from additionalDataEmailSlice
        dispatch(resetSelectedMails());
        // const pageType = arg;
        // if (pageType === inboxType) {
        //   dispatch(resetInboxMailAdditionalData());
        // } else if (pageType === starredType) {
        //   dispatch(resetStarredMailAdditionalData());
        // } else if (pageType === importantType) {
        //   dispatch(resetImportantMailAdditionalData());
        // }
      },
    }),
  }),
});

export const { useSendMailMutation, useGetAllMailsQuery } = emailApi;
