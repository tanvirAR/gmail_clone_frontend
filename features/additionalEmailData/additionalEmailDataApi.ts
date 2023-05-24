import { requestData } from "../../interface/additionalMailDataMutation.interface";
import { apiSlice } from "../api/apiSlice";
import { resetSelectedMails } from "../email/emailSlice";
import {
  starredType,
  inboxType,
  importantType,
  sentType,
  spamType,
} from "../../interface/EmailType";
import {
  resetImportantMailAdditionalData,
  resetInboxMailAdditionalData,
  resetSentEmailAdditionalData,
  resetSpamEmailAdditionalData,
  resetStarredMailAdditionalData,
  resetTrashEmailAdditionalData,
} from "./additionalEmailDataSlice";

export const additionalEmailDataApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdditionalSingleMailProperty: builder.query({
      query: (data: requestData) => ({
        url: `email/singlemail/property/${data.mailId}`,
        method: "GET",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        // beforerefetch,  clear slice state data of selected mails in email slice and addtinal email data from additionalDataEmailSlice
        // dispatch(resetInboxMailAdditionalData());
        dispatch(resetSelectedMails());
        const { pageType } = args;
        if (pageType === inboxType) {
          dispatch(resetInboxMailAdditionalData());
        } else if (pageType === starredType) {
          dispatch(resetStarredMailAdditionalData());
        } else if (pageType === importantType) {
          dispatch(resetImportantMailAdditionalData());
        } else if (pageType === sentType) {
          dispatch(resetSentEmailAdditionalData());
        } else if (pageType === spamType) {
          dispatch(resetSpamEmailAdditionalData());
        } else if (pageType === sentType) {
          dispatch(resetTrashEmailAdditionalData());
        }
      },
    }),
  }),
});

export const { useGetAdditionalSingleMailPropertyQuery } =
  additionalEmailDataApi;
