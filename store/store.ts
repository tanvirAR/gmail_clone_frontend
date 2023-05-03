import { configureStore } from "@reduxjs/toolkit";

// internal imports
import { apiSlice } from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import emailSlice from "../features/email/emailSlice";
import UISliceReducer from "../features/UI/UISlice";
import additionalEmailDataSlice from "../features/additionalEmailData/additionalEmailDataSlice";


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    UI: UISliceReducer,
    auth: authSlice,
    email: emailSlice,
    additionalEmailData: additionalEmailDataSlice
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
