import { apiSlice } from "../api/apiSlice";
import { resetSelectedMails } from "../email/emailSlice";

export const additionalEmailDataApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdditionalSingleMailProperty: builder.query({
      query: (mailId: string) => ({
        url: `email/singlemail/property/${mailId}`,
        method: "GET",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        /* beforerefetch,  clear slice state data of selected mails in email slice and addtinal email data from additionalDataEmailSlice */
        dispatch(resetSelectedMails());
      },
    }),
  }),
});

export const { useGetAdditionalSingleMailPropertyQuery } =
  additionalEmailDataApi;
