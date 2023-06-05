import { readMailInterface } from "../../interface/readMail.interface";
import { additionalEmailDataApi } from "../additionalEmailData/additionalEmailDataApi";
import { apiSlice } from "../api/apiSlice";

export const readEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markReadSingleMail: builder.mutation({
      query: (mailId: readMailInterface) => ({
        url: "/email/mark/read",
        method: "POST",
        body: JSON.stringify(mailId),
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
              draft.mail.read = true;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          // if fails, reverse cache state
          patchResult.undo();
        }
      },
    }),

    markUnReadSingleMail: builder.mutation({
      query: (mailId: readMailInterface) => ({
        url: "/email/mark/unread",
        method: "POST",
        body: JSON.stringify(mailId),
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
              draft.mail.read = false;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          // if fails, reverse cache state
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {useMarkReadSingleMailMutation, useMarkUnReadSingleMailMutation} = readEmailApi;
