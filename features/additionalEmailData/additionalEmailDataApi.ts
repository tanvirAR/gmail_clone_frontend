import { apiSlice } from "../api/apiSlice";

export const additionalEmailDataApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdditionalSingleMailProperty: builder.query({
      query: (emailId: string) => ({
        url: `email/singlemail/property/${emailId}`,
        method: "GET",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetAdditionalSingleMailPropertyQuery } =
  additionalEmailDataApi;
