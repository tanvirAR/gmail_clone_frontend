import { createSlice } from "@reduxjs/toolkit";
import AuthSliceInterface from "../../interface/AuthSlice.interface";

const initialState: AuthSliceInterface = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userLoggedIn } = authSlice.actions;
export default authSlice.reducer;
