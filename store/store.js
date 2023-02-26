import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice"
// import authSliceReducer from "../features/auth/authSlice";
// import conversationsSliceReducer from "../features/conversations/conversationsSlice";
// import mesagesSliceReducer from "../features/messages/messagesSlice";
// import SearchPeopleSlice from "../features/searchPeoples/searchPeopleSlice";
import UISliceReducer from "../features/UI/UISlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    UI: UISliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
