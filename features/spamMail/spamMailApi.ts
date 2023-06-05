import { email } from "../../interface/singleMail.interface";
import { apiSlice } from "../api/apiSlice";
import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import { keepUnusedDataInSeconds } from "../../constants/constants";
import {
  emailPagesTypeForCacheUpdate,
  emailTypesAsPages,
} from "../../interface/EmailTypeCheckForCacheUptdate.interface";
import extractEmailAPiAndEndpointName from "../../utils/emailApi&EndpointNameExtractByType";



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
      keepUnusedDataFor: keepUnusedDataInSeconds,
    }),

    markMailAsSpam: builder.mutation({
      query: (data: {
        mailId: string;
        mailProperty: email;
        pageType: emailType;
      }) => ({
        url: "/email/mark/spam",
        method: "POST",
        body: JSON.stringify({ mailId: data.mailId }),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { mailId, mailProperty, pageType } = arg;
        let apiName: any;
        let endPointName: string;
        const { api, endpoint } = extractEmailAPiAndEndpointName(pageType);
        apiName = api;
        endPointName = endpoint;

        /* remove the email from the page cache from where its marked as trash like if the email is marked trash from inbox page, Optimistically remove the email data from the inbox mails list */
        const patchResult = dispatch(
          apiName.util.updateQueryData(
            endPointName,
            undefined,
            (draft: any) => {
              const updatedDraft = draft.mails.filter(
                (singleEmail: email) => singleEmail.id != mailId
              );
              return { mails: updatedDraft };
            }
          )
        );

        try {
          const reponse = await queryFulfilled;

          // ______________________________________________________________________

          const emailTypes: emailPagesTypeForCacheUpdate = reponse.data.type;

          emailTypesAsPages.forEach((type) => {
            let apiName: any;
            let endPointName: string;
            const { api, endpoint } = extractEmailAPiAndEndpointName(type);
            apiName = api;
            endPointName = endpoint;

            if (!emailTypes[type] && pageType !== type) {
              dispatch(
                apiName.util.updateQueryData(
                  endPointName,
                  undefined,
                  (draft: any) => {
                    const updatedDraft = draft.mails.filter(
                      (singleEmail: email) => singleEmail.id != mailId
                    );
                    return { mails: updatedDraft };
                  }
                )
              );
            } else if (emailTypes[type]) {
              dispatch(
                apiName.util.updateQueryData(
                  endPointName,
                  undefined,
                  (draft: any) => {
                    draft.mails.unshift(mailProperty);
                  }
                )
              );
            }
          });
        } catch (err) {
          if (patchResult !== undefined) {
            patchResult.undo();
          }
          // other error handling is done in UI components
        }
      },
    }),

    markMailAsUnSpam: builder.mutation({
      query: (data: { mailId: string; emailProp: email }) => ({
        url: "/email/mark/unspam",
        method: "POST",
        body: JSON.stringify({ mailId: data.mailId }),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        /* after marking an email as Unspam, Optimistically remove the email from the spam page   (START)  */
        const patchResult = dispatch(
          spamMailApi.util.updateQueryData(
            "getSpamMails",
            undefined,
            (draft) => {
              const updatedDraft = draft.mails.filter(
                (singleEmail: email) => singleEmail.id != arg.mailId
              );
              return { mails: updatedDraft };
            }
          )
        );
        /* after marking an email as Unspam, Optimistically remove the email from the spam page   (END)  */

        try {
          const response = await queryFulfilled;

          const emailTypes: emailPagesTypeForCacheUpdate = response.data.type;

          emailTypesAsPages.forEach((type) => {
            let apiName: any;
            let endPointName: string;
            const { api, endpoint } = extractEmailAPiAndEndpointName(type);
            apiName = api;
            endPointName = endpoint;

            if (!emailTypes[type]) {
              dispatch(
                apiName.util.updateQueryData(
                  endPointName,
                  undefined,
                  (draft: any) => {
                    const updatedDraft = draft.mails.filter(
                      (singleEmail: email) => singleEmail.id != arg.mailId
                    );
                    return { mails: updatedDraft };
                  }
                )
              );
            } else if (emailTypes[type]) {
              dispatch(
                apiName.util.updateQueryData(
                  endPointName,
                  undefined,
                  (draft: any) => {
                    draft.mails.push(arg.emailProp);
                  }
                )
              );
            }
          });
        } catch (error) {
          /* other error handling is done in UI */
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetSpamMailsQuery,
  useMarkMailAsSpamMutation,
  useMarkMailAsUnSpamMutation,
} = spamMailApi;
