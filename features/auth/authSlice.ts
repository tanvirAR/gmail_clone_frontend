import { createSlice } from "@reduxjs/toolkit";
import AuthSliceInterface from "../../interface/AuthSlice.interface";

const initialState: AuthSliceInterface = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = undefined;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
