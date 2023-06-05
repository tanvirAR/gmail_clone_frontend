import { createSlice } from "@reduxjs/toolkit";
import { emailSlice as emailSliceInterface } from "../../interface/EmailSliceInterface";

const initialState: emailSliceInterface = {
  currentSelected: "none",
  selectedMails: [],
  selectedMailsWithProps: [],
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
      state.selectedMails = state.selectedMails.filter(
        (maildId) => maildId !== action.payload
      );
    },

    resetSelectedMails(state) {
      return initialState;
    },

    setSelectedMailsWithProps: (state, action) => {
      state.selectedMailsWithProps.push(action.payload);
    },
    removeMailFromSelectedMailsWithPropsList: (state, action) => {
      state.selectedMailsWithProps = state.selectedMailsWithProps.filter(
        (email) => email.id !== action.payload
      );
    },
  },
});

export const {
  setCurrentMailCategorySelected,
  setSelectedMails,
  removeMailFromSelectedList,
  resetSelectedMails,
  removeMailFromSelectedMailsWithPropsList,
  setSelectedMailsWithProps,
} = emailSlice.actions;

export default emailSlice.reducer;


