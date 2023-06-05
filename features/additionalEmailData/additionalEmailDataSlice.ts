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
  searchedMail: [],
  
};

const additionalEmailDataSlice = createSlice({
  name: "additionalEmailDataSlice",
  initialState,
  reducers: {
    setInboxEmailAdditionalData: (state, action) => {
      state.inbox.push(action.payload);
    },

    filterInboxMailsAdditionalData: (state, action) => {
      state.inbox = state.inbox.filter(
        (email) => email.mailId != action.payload
      );
    },

    resetInboxMailAdditionalData: (state) => {
      state.inbox = [];
    },

    setStarredEmailAdditionalData: (state, action) => {
      state.starred.push(action.payload);
    },

    filterStarredMailsAdditionalData: (state, action) => {
      state.starred = state.starred.filter(
        (email) => email.mailId != action.payload
      );
    },

    resetStarredMailAdditionalData: (state) => {
      state.starred = [];
    },
    setImportantEmailAdditionalData: (state, action) => {
      state.important.push(action.payload);
    },
    filterImportantMailsAdditionalData: (state, action) => {
      state.important = state.important.filter(
        (email) => email.mailId != action.payload
      );
    },
    resetImportantMailAdditionalData: (state) => {
      state.important = [];
    },
    setSentEmailAdditionalData: (state, action) => {
      state.sent.push(action.payload);
    },
    filterSentMailsAdditionalData: (state, action) => {
      state.sent = state.sent.filter(
        (email) => email.mailId != action.payload
      );
    },
    resetSentEmailAdditionalData: (state) => {
      state.sent = [];
    },

    setSpamEmailAdditionalData: (state, action) => {
      state.spam.push(action.payload);
    },
    filterSpamMailsAdditionalData: (state, action) => {
      state.spam = state.spam.filter(
        (email) => email.mailId != action.payload
      );
    },
    resetSpamEmailAdditionalData: (state) => {
      state.spam = [];
    },

    setTrashEmailAdditionalData: (state, action) => {
      state.trash.push(action.payload);
    },
    filterTrashMailsAdditionalData: (state, action) => {
      state.trash = state.trash.filter(
        (email) => email.mailId != action.payload
      );
    },
    resetTrashEmailAdditionalData: (state) => {
      state.trash = [];
    },

    setScheduledEmailAdditionalData: (state, action) => {
      state.scheuduled.push(action.payload);
    },
    filterScheduledMailsAdditionalData: (state, action) => {
      state.scheuduled = state.scheuduled.filter(
        (email) => email.mailId != action.payload
      );
    },
    resetScheduledEmailAdditionalData: (state) => {
      state.scheuduled = [];
    },

    setSnoozedEmailAdditionalData: (state, action) => {
      state.snoozed.push(action.payload);
    },
    filterSnoozedMailsAdditionalData: (state, action) => {
      state.snoozed = state.snoozed.filter(
        (email) => email.mailId != action.payload
      );
    },

    resetSnoozedEmailAdditionalData: (state) => {
      state.snoozed = [];
    },

    setSearchedEmailAdditionalData: (state, action) => {
      state.searchedMail.push(action.payload);
    },
    filterSearchedMailsAdditionalData: (state, action) => {
      state.searchedMail = state.searchedMail.filter(
        (email) => email.mailId != action.payload
      );
    },

    resetSearchedEmailAdditionalData: (state) => {
      state.searchedMail = [];
    },
  },
});

export const {
  setInboxEmailAdditionalData,
  filterInboxMailsAdditionalData,
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
  resetSearchedEmailAdditionalData,
  setSearchedEmailAdditionalData,
  filterImportantMailsAdditionalData,
  filterScheduledMailsAdditionalData, 
  filterSearchedMailsAdditionalData,
  filterSentMailsAdditionalData,
  filterSnoozedMailsAdditionalData,
  filterSpamMailsAdditionalData,
  filterStarredMailsAdditionalData,
  filterTrashMailsAdditionalData
} = additionalEmailDataSlice.actions;

export default additionalEmailDataSlice.reducer;
