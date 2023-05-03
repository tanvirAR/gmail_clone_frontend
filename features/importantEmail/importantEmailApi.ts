import { apiSlice } from "../api/apiSlice";

export const importantEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImportantMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails/important",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    markMailAsImportant: builder.mutation({
      query: (mailId: string) => ({
        url: `/email/mark/important/${mailId}`,
        method: "POST",
        Credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

  }),
});

export const {useGetImportantMailsQuery, useMarkMailAsImportantMutation} = importantEmailApi;
