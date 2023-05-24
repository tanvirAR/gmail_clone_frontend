import { createSlice } from "@reduxjs/toolkit";
import { emailSlice as emailSliceInterface } from "../../interface/EmailSliceInterface";

const initialState: emailSliceInterface = {
  currentSelected: "none",
  selectedMails: [],
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setSelectedMails: (state, action) => {
      state.selectedMails.push(action.payload);
    },

    setCurrentMailCategorySelected: (state, action) => {
      state.currentSelected = action.payload;
    },

    removeMailFromSelectedList: (state, action) => {
      state.selectedMails = state.selectedMails.filter(maildId => maildId !== action.payload)
    },

    resetSelectedMails(state) {
      return initialState;
    },
  },
});

export const {
  setCurrentMailCategorySelected,
  setSelectedMails,
  removeMailFromSelectedList,
  resetSelectedMails,
} = emailSlice.actions;

export default emailSlice.reducer;


