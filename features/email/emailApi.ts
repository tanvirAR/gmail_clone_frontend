import sendMailReqBodyInterface from "../../interface/sendMailReqBody.interface";
import { env } from "process";

import { apiSlice } from "../api/apiSlice";
import { resetSelectedMails } from "./emailSlice";

import { sentMailApi } from "../sentMail/sentMailApi";
import { keepUnusedDataInSeconds } from "../../constants/constants";
import { io } from "socket.io-client";

export const emailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMail: builder.mutation({
      query: (data: sendMailReqBodyInterface) => ({
        url: "/email/sendmail",
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

          /* if email send sucessfully, insert the mail into sent mail page chache query. */
          dispatch(
            sentMailApi.util.updateQueryData(
              "getSentMails",
              undefined,
              (draft) => {
                draft.mails.unshift(response.data.mail);
              }
            )
          );
        } catch (err) {
          // error handling is done inside compoennts
        }
      },
    }),

    getAllMails: builder.query<any, void>({
      query: () => ({
        url: "/email/getmails",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
      keepUnusedDataFor: keepUnusedDataInSeconds,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // beforerefetch,  clear slice state data of selected mails in email slice
        dispatch(resetSelectedMails());
      },

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        /* @Socket Implementation */
        // const socket = io("https://gmail-clone-ar.vercel.app", {
        //   reconnectionDelay: 1000,
        //   reconnection: true,
        //   reconnectionAttempts: 10,
        //   transports: ["websocket"],
        //   agent: false,
        //   upgrade: false,
        //   rejectUnauthorized: false,
        // });

        try {
          await cacheDataLoaded;

          // socket.on("newEmail", (data) => {
          //   if (data) {
          //     updateCachedData((draft) => {
          //       if (draft.userId == data.data.receiverId) {
          //         draft.mails.unshift(data?.data);
          //       }
          //     });
          //   }
          // });
        } catch (err) {}

        await cacheEntryRemoved;
        // socket.close();
      },
    }),
  }),
});

export const { useSendMailMutation, useGetAllMailsQuery } = emailApi;
