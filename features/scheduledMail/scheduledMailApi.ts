import { keepUnusedDataInSeconds } from "../../constants/constants";
import { sendScheduledMailInterface } from "../../interface/sendMailReqBody.interface";
import { email } from "../../interface/singleMail.interface";
import { apiSlice } from "../api/apiSlice";

export const scheduledEmailApi = apiSlice.injectEndpoints({
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          /* if scheduled email is sent successfully, insert the mail data in the scheduled page cache  */
          dispatch(
            scheduledEmailApi.util.updateQueryData(
              "getAllScheduledMails",
              undefined,
              (draft) => {
                draft.mails.unshift(response.data.mail);
              }
            )
          );
        } catch (err) {
          //  handled in UI
        }
      },
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistically remove the email from scheduled page cache data
        const patchResult = dispatch(
          scheduledEmailApi.util.updateQueryData(
            "getAllScheduledMails",
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
        } catch (err) {
          patchResult.undo();
        }
      },
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
      keepUnusedDataFor: keepUnusedDataInSeconds,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // beforerefetch,  clear slice state data of selected mails in email slice and addtinal email data from additionalDataEmailSlice
        // dispatch(resetSelectedMails());
      },
    }),
  }),
});

export const {
  useGetAllScheduledMailsQuery,
  useSendScheduledMailMutation,
  useCancellScheduledMailMutation,
} = scheduledEmailApi;
