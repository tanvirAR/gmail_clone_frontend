import { keepUnusedDataInSeconds } from "../../constants/constants";
import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import { email } from "../../interface/singleMail.interface";
import { apiSlice } from "../api/apiSlice";
import extractEmailAPiAndEndpointName from "../../utils/emailApi&EndpointNameExtractByType";
import { emailPagesTypeForCacheUpdate, emailTypesAsPages } from "../../interface/EmailTypeCheckForCacheUptdate.interface";

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
      keepUnusedDataFor: keepUnusedDataInSeconds,
    }),

    markTrashSingleInboxMail: builder.mutation({
      query: (data: { mailId: string; mailProperty: email, pageType: emailType }) => ({
        url: `/email/trash/${data.mailId}`,
        method: "POST",
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
            } else if (emailTypes[type] === true) {
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
          // error handling is done in UI components
        }
      },
    }),

    deleteMailPermanently: builder.mutation({
      query: (data: {mailId: string, pageType: emailType}) => ({
        url: `/email/mail/delete/${data.mailId}`,
        method: "DELETE",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),

       async onQueryStarted(arg, { queryFulfilled, dispatch }) { 
         let apiName: any;
         let endPointName: string;
         const { api, endpoint } = extractEmailAPiAndEndpointName(arg.pageType);
         apiName = api;
         endPointName = endpoint;

         /* remove the email from the page cache from where its marked as trash like if the email is marked trash from inbox page, Optimistically remove the email data from the inbox mails list */
         const patchResult = dispatch(
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

         try {
          await queryFulfilled;
         } catch (err) {  
          patchResult.undo();
         }

        }
    }),
  }),
});

export const {
  useGetTrashMailsQuery,
  useMarkTrashSingleInboxMailMutation,
  useDeleteMailPermanentlyMutation,
} = trashEmailApi;
