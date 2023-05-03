import { createSlice } from "@reduxjs/toolkit";
import { additionalEmailDataSlice as sliceInterface } from "../../interface/additionalEmailDataSlice.interafce";

const initialState: sliceInterface = {
  inbox: [],
};

const additionalEmailDataSlice = createSlice({
  name: "additionalEmailDataSlice",
  initialState,
  reducers: {
    setInboxEmailAdditionalData: (state, action) => {
      state.inbox.push(action.payload);
    },

    resetInboxMailAdditionalData: (state) => {
      state.inbox = [];
    },
  },
});

export const { setInboxEmailAdditionalData, resetInboxMailAdditionalData } = additionalEmailDataSlice.actions;

export default additionalEmailDataSlice.reducer;
