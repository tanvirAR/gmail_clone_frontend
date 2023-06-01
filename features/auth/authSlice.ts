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
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
