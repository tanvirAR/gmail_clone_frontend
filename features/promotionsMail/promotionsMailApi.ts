import { readMailInterface } from "../../interface/readMail.interface";
import { apiSlice } from "../api/apiSlice";

export const promotionsMailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotionsMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/social",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    markMailAsPromotion: builder.mutation({
      query: (data: readMailInterface) => ({
        url: `/email/mark/promotions`,
        method: "POST",
        body: JSON.stringify(data),
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetPromotionsMailsQuery, useMarkMailAsPromotionMutation } =
  promotionsMailApi;
