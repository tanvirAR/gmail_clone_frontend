import { createSlice } from "@reduxjs/toolkit";
import InitialState from "../../interface/UISlice.interface";

const initialState: InitialState = {
  sentBoxSmallScreen: false,
  sentBoxLargeScreen: false,
  minimizeEmailPop: false,

  // sidebar toggle state
  sidebarOn: {
    onByToggle: false,
    onByHover: false,
  },
  // email selecting div in each page
  EmailCategorySelectContainer: false,
  // field value for sending a new mail
  sentAEmail: {
    to: "",
    subject: "",
    message: "",
  },
  sentEmailErrorPopUpToggled: false,
  // loading a custom toast after sending a email
  isSendingMailLoading: {
    isLoading: false,
    isComponentVisible: false,
  },

  // attachment for email
  attachment: null,
  attachmentFirebaseReturnedUrl: "",
  attachmentUploadProgressBar: 0,

  snoozedMailTimeSelectComponent: false,
  mailIdForMarkingSnoozed: '',
  scheduledSentTimeSelectComponent: false,


  attachmentView: {
    isVisible: false,
    url: "",
  },
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
      state.sentAEmail.to = action.payload;
    },

    sentAEmailSubject: (state, action) => {
      state.sentAEmail.subject = action.payload;
    },

    sentAEmailMessage: (state, action) => {
      state.sentAEmail.message = action.payload;
    },

    // clear the send mail all input field
    clearEmailInputs: (state) => {
      (state.sentAEmail = {
        to: "",
        subject: "",
        message: "",
      }),
        (state.attachment = null);
    },
    ToggleEmailSendError: (state, action) => {
      state.sentEmailErrorPopUpToggled = action.payload;
    },

    // send mail alert visibility handling
    isSendingMailLoadingAction: (state, action) => {
      state.isSendingMailLoading.isLoading = action.payload;
    },
    isSendingMailLoadingVisible: (state, action) => {
      state.isSendingMailLoading.isComponentVisible = action.payload;
    },

    setAttachment: (state, action) => {
      state.attachment = action.payload;
    },

    setFirebaseUrl: (state, action) => {
      state.attachmentFirebaseReturnedUrl = action.payload;
    },

    setAttachmentUploadProgg: (state, action) => {
      state.attachmentUploadProgressBar = action.payload;
    },

    setAttachmentView: (state, action) => {
      state.attachmentView = action.payload;
    },

    setSnoozedMailTimeComponent: (state, action) => {
      state.snoozedMailTimeSelectComponent = action.payload;
    },
    setMailIdForSnoozed: (state, action) => {
      state.mailIdForMarkingSnoozed = action.payload;
    },
    setScheduledMailSentTimeSelectComponent: (state, action) => {
      state.scheduledSentTimeSelectComponent = action.payload;
    },
  },
});

export const {
  sentEmailBoxSmall,
  sentEmailBoxLarge,
  // minimizeEmailPop,
  sidebarByToggle,
  sidebarByHover,
  showEmailSelectCategoryDiv,
  sentEmailMinimizePopup,
  sentEmailTo,
  sentAEmailSubject,
  sentAEmailMessage,

  clearEmailInputs,
  setFirebaseUrl,
  setAttachmentUploadProgg,
  setAttachmentView,

  ToggleEmailSendError,
  isSendingMailLoadingAction,
  isSendingMailLoadingVisible,

  setSnoozedMailTimeComponent,
  setMailIdForSnoozed,
  setScheduledMailSentTimeSelectComponent,

  setAttachment,
} = UISlice.actions;

export default UISlice.reducer;
