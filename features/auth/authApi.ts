import { signInInterface, signUpInterface } from "../../interface/Auth.interface";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data: signUpInterface) => ({
        url: "/signup",
        method: "POST",
        body: JSON.stringify(data),
        credential: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    login: builder.mutation({
      query: (data: signInInterface) => ({
        url: "/",
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),

    checkLogin: builder.query<any, void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useCheckLoginQuery } = authApi;


// <any, void>