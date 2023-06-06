import { email } from "../../interface/singleMail.interface";
import { apiSlice } from "../api/apiSlice";
import { emailApi } from "../email/emailApi";
import { spamMailApi } from "../spamMail/spamMailApi";
import { trashEmailApi } from "../trashMail/trashMailApi";

export const moveEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    moveFromSentToInbox: builder.mutation({
      query: (data: { mailId: string; mailProperty: email }) => ({
        url: "/email/move/sent/to/inbox",
        method: "PATCH",
        body: JSON.stringify({ mailId: data.mailId }),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          /* add the email to the inbox page pecimisstically */
          dispatch(
            emailApi.util.updateQueryData("getAllMails", undefined, (draft) => {
              draft.mails.unshift(arg.mailProperty);
            })
          );
        } catch (err) {}
      },
    }),

    moveFromSpamToInbox: builder.mutation({
      query: (data: { mailId: string; mailProperty: email }) => ({
        url: "/email/move/spam/to/inbox",
        method: "PATCH",
        body: JSON.stringify({ mailId: data.mailId }),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        /* optimistically remove the demail from spam page */
        const patchResult = dispatch(
          spamMailApi.util.updateQueryData(
            "getSpamMails",
            undefined,
            (draft) => {
              const updatedDraft = draft.mails.filter(
                (singleEmail: email) => singleEmail.id !== arg.mailId
              );
              return { mails: updatedDraft };
            }
          )
        );

        try {
          await queryFulfilled;
          /* add the email to the inbox page pecimisstically */
          dispatch(
            emailApi.util.updateQueryData("getAllMails", undefined, (draft) => {
              draft.mails.unshift(arg.mailProperty);
            })
          );
        } catch (err) {
          patchResult.undo();
        }
      },
    }),

    moveFromTrashToInbox: builder.mutation({
      query: (data: { mailId: string; mailProperty: email }) => ({
        url: "/email/move/trash/to/inbox",
        method: "PATCH",
        body: JSON.stringify({ mailId: data.mailId }),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        /* optimistically remove the demail from trash page */
        const patchResult = dispatch(
          trashEmailApi.util.updateQueryData(
            "getTrashMails",
            undefined,
            (draft) => {
              const updatedDraft = draft.mails.filter(
                (singleEmail: email) => singleEmail.id !== arg.mailId
              );
              return { mails: updatedDraft };
            }
          )
        );

        try {
          await queryFulfilled;
          /* add the email to the inbox page pecimisstically */
          dispatch(
            emailApi.util.updateQueryData("getAllMails", undefined, (draft) => {
              draft.mails.unshift(arg.mailProperty);
            })
          );
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useMoveFromSentToInboxMutation,
  useMoveFromSpamToInboxMutation,
  useMoveFromTrashToInboxMutation,
} = moveEmailApi;
