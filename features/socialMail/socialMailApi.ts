import { readMailInterface } from "../../interface/readMail.interface";
import { apiSlice } from "../api/apiSlice";

export const socialMailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSocialMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/promotions",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    markMailAsSocial: builder.mutation({
      query: (data: readMailInterface) => ({
        url: `/email/mark/social`,
        method: "POST",
        Credential: "include",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetSocialMailsQuery, useMarkMailAsSocialMutation } =
  socialMailApi;
