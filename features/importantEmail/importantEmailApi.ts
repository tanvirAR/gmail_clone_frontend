import { keepUnusedDataInSeconds } from "../../constants/constants";
import { email } from "../../interface/singleMail.interface";
import { additionalEmailDataApi } from "../additionalEmailData/additionalEmailDataApi";
import { apiSlice } from "../api/apiSlice";

export const importantEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImportantMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/important",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      keepUnusedDataFor: keepUnusedDataInSeconds,
    }),

    markMailAsImportant: builder.mutation({
      query: (data: {mailId: string, emailProperty: email}) => ({
        url: `/email/mark/important/${data.mailId}`,
        method: "POST",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update
        const patchResult = dispatch(
          additionalEmailDataApi.util.updateQueryData(
            "getAdditionalSingleMailProperty",
            arg.mailId,
            (draft) => {
              draft.mail.important = true;
            }
          )
        );

        /* the email which is being marked as important, add to the importantEmailPage cache ie getImportantMails */
        const patchResultToAddEmailInStarredPage = dispatch(
          importantEmailApi.util.updateQueryData(
            "getImportantMails",
            undefined,
            (draft) => {
              draft.mails.unshift(arg.emailProperty);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          // if fails, reverse cache state
          patchResult.undo();
          patchResultToAddEmailInStarredPage.undo();
        }
      },
    }),

    markMailAsUnImportant: builder.mutation({
      query: (mailId: string) => ({
        url: `/email/mark/unimportant/${mailId}`,
        method: "POST",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update
        const patchResult = dispatch(
          additionalEmailDataApi.util.updateQueryData(
            "getAdditionalSingleMailProperty",
            arg,
            (draft) => {
              draft.mail.important = false;
            }
          )
        );


            const patchResultRemoveStarredEmailFromStarredPage = dispatch(
              importantEmailApi.util.updateQueryData(
                "getImportantMails",
                undefined,
                (draft) => {
                  const updatedDraft = draft.mails.filter(
                    (singleEmail: email) => singleEmail.id != arg
                  );
                  return { mails: updatedDraft };
                }
              )
            );

        try {
          await queryFulfilled;
        } catch (error) {
          // if fails, reverse cache state
          patchResult.undo();
          patchResultRemoveStarredEmailFromStarredPage.undo()
        }
      },
    }),
  }),
});

export const {useGetImportantMailsQuery, useMarkMailAsImportantMutation, useMarkMailAsUnImportantMutation} = importantEmailApi;
