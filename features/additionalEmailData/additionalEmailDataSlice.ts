import { createSlice } from "@reduxjs/toolkit";
import { additionalEmailDataSlice as sliceInterface } from "../../interface/additionalEmailDataSlice.interafce";

const initialState: sliceInterface = {
  inbox: [],
  important: [],
  starred: [],
  sent: [],
  trash: [],
  spam: [],
  scheuduled: [],
  snoozed: [],
  
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

    setStarredEmailAdditionalData: (state, action) => {
      state.starred.push(action.payload);
    },

    resetStarredMailAdditionalData: (state) => {
      state.starred = [];
    },
    setImportantEmailAdditionalData: (state, action) => {
      state.important.push(action.payload);
    },

    resetImportantMailAdditionalData: (state) => {
      state.important = [];
    },
    setSentEmailAdditionalData: (state, action) => {
      state.sent.push(action.payload);
    },

    resetSentEmailAdditionalData: (state) => {
      state.sent = [];
    },

    setSpamEmailAdditionalData: (state, action) => {
      state.spam.push(action.payload);
    },

    resetSpamEmailAdditionalData: (state) => {
      state.spam = [];
    },

    setTrashEmailAdditionalData: (state, action) => {
      state.trash.push(action.payload);
    },

    resetTrashEmailAdditionalData: (state) => {
      state.trash = [];
    },

    setScheduledEmailAdditionalData: (state, action) => {
      state.scheuduled.push(action.payload);
    },

    resetScheduledEmailAdditionalData: (state) => {
      state.scheuduled = [];
    },

    setSnoozedEmailAdditionalData: (state, action) => {
      state.snoozed.push(action.payload);
    },

    resetSnoozedEmailAdditionalData: (state) => {
      state.snoozed = [];
    },
  },
});

export const {
  setInboxEmailAdditionalData,
  resetInboxMailAdditionalData,
  setStarredEmailAdditionalData,
  resetStarredMailAdditionalData,
  setImportantEmailAdditionalData,
  resetImportantMailAdditionalData,
  setSentEmailAdditionalData,
  resetSentEmailAdditionalData,
  setSpamEmailAdditionalData,
  resetSpamEmailAdditionalData,
  setTrashEmailAdditionalData,
  resetTrashEmailAdditionalData,
  setScheduledEmailAdditionalData,
  resetScheduledEmailAdditionalData,
  setSnoozedEmailAdditionalData,
  resetSnoozedEmailAdditionalData,
} = additionalEmailDataSlice.actions;

export default additionalEmailDataSlice.reducer;
