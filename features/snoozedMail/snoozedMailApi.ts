import { keepUnusedDataInSeconds } from "../../constants/constants";
import { email } from "../../interface/singleMail.interface";
import { apiSlice } from "../api/apiSlice";

export const snoozedEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markMailAsSnoozed: builder.mutation({
      query: (data: { mailId: string; time: string }) => ({
        url: "/email/mark/snoozed",
        method: "POST",
        body: JSON.stringify(data),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["snoozedMails"],
    }),

    cancellSnoozeMail: builder.mutation({
      query: (data: { mailId: string }) => ({
        url: "/email/snooze/cancell",
        method: "PATCH",
        body: JSON.stringify(data),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        /**  optimistically remove the specic snoozedMails @cahedata in @getAllSnoozedMails cahche  */
        const patchResult = dispatch(
          snoozedEmailApi.util.updateQueryData(
            "getAllSnoozedMails",
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
        } catch (err) {
          patchResult.undo();
        }
      },
    }),

    getAllSnoozedMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/snoozed",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      providesTags: ["snoozedMails"],
      keepUnusedDataFor: keepUnusedDataInSeconds,
    }),
  }),
});

export const {
  useGetAllSnoozedMailsQuery,
  useCancellSnoozeMailMutation,
  useMarkMailAsSnoozedMutation,
} = snoozedEmailApi;
