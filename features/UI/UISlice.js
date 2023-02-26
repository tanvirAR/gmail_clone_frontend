import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentBoxSmallScreen: false,
  sentBoxLargeScreen: false,
  minimizeEmailPop: false,
  sidebarOn: {
    onByToggle: false,
    onByHover: false,
  },
  EmailCategorySelectContainer: false,
  sentAEmail: {
    to: '',
    subject: '',
    message: ''
  }
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    sentEmailBoxSmall: (state, action) => {
      state.sentBoxSmallScreen = action.payload;
    },
    sentEmailBoxLarge: (state, action) => {
      state.sentBoxLargeScreen = action.payload;
    },
    sentEmailMinimizePopup: (state, action) => {
      state.minimizeEmailPop = action.payload;
    },
    sidebarByToggle: (state, action) => {
      state.sidebarOn.onByToggle = action.payload;
    },
    sidebarByHover: (state, action) => {
      state.sidebarOn.onByHover = action.payload;
    },
    showEmailSelectCategoryDiv: (state, action) => {
      state.EmailCategorySelectContainer = action.payload;
    },
  
    sentEmailTo: (state, action) => {
      state.sentAEmail.to = action.payload
    },

    sentAEmailSubject: (state, action) => {
      state.sentAEmail.subject = action.payload
    },

    sentAEmailMessage: (state, action) => {
      state.sentAEmail.message = action.payload
    }
  },
});

export const {
  sentEmailBoxSmall,
  sentEmailBoxLarge,
  minimizeEmailPop,
  sidebarByToggle,
  sidebarByHover,
  showEmailSelectCategoryDiv,
  sentEmailMinimizePopup,
  sentEmailTo,
  sentAEmailSubject,
  sentAEmailMessage
} = UISlice.actions;

export default UISlice.reducer;
