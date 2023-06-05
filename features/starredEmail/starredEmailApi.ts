import { keepUnusedDataInSeconds } from "../../constants/constants";
import { email } from "../../interface/singleMail.interface";
import { additionalEmailDataApi } from "../additionalEmailData/additionalEmailDataApi";
import { apiSlice } from "../api/apiSlice";

export const starredEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStarredMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/starred",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      keepUnusedDataFor: keepUnusedDataInSeconds,
    }),

    markMailAsStarred: builder.mutation({
      query: (data: { mailId: string; emailProperty: email }) => ({
        url: `/email/mark/starred/${data.mailId}`,
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
              draft.mail.starred = true;
            }
          )
        );

        /* the email which is being marked as starred, add to the starredPage cache ie getSarredMails */
        const patchResultToAddEmailInStarredPage = dispatch(
          starredEmailApi.util.updateQueryData(
            "getStarredMails",
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

    markMailAsUnStarred: builder.mutation({
      query: (mailId: string) => ({
        url: `/email/mark/unstarred/${mailId}`,
        method: "POST",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update
        const patchResultRemoveStart = dispatch(
          additionalEmailDataApi.util.updateQueryData(
            "getAdditionalSingleMailProperty",
            arg,
            (draft) => {
              draft.mail.starred = false;
            }
          )
        );

        const patchResultRemoveStarredEmailFromStarredPage = dispatch(
          starredEmailApi.util.updateQueryData(
            "getStarredMails",
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
          patchResultRemoveStart.undo();
          patchResultRemoveStarredEmailFromStarredPage.undo();
        }
      },
    }),
  }),
});

export const {
  useGetStarredMailsQuery,
  useMarkMailAsStarredMutation,
  useMarkMailAsUnStarredMutation,
} = starredEmailApi;
