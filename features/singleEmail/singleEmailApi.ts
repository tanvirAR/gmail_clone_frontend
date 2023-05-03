import { apiSlice } from "../api/apiSlice";

export const singleEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleMail: builder.query({
      query: (emailId: string) => ({
        url: `/email/singlemail/${emailId}`,
        method: "GET",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {useGetSingleMailQuery} = singleEmailApi;
