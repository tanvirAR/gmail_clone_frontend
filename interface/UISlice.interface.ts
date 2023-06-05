interface UIInitialState {
  sentBoxSmallScreen: boolean;
  sentBoxLargeScreen: boolean;
  minimizeEmailPop: boolean;
  sidebarOn: {
    onByToggle: boolean;
    onByHover: boolean;
  };
  EmailCategorySelectContainer: boolean;
  sentAEmail: {
    to: string;
    subject: string;
    message: string;
  };
  sentEmailErrorPopUpToggled: boolean;
  isSendingMailLoading: {
    message: sendingMailMessage;
    isComponentVisible: boolean;
  };
  attachment: {
    name: string;
    type: string;
    size: string;
  } | null;
  attachmentUploadProgressBar: number;
  attachmentFirebaseReturnedUrl: string;

  snoozedMailTimeSelectComponent: boolean;
  mailIdForMarkingSnoozed: string;

  scheduledSentTimeSelectComponent: boolean;

  attachmentView: {
    isVisible: boolean;
    url: string;
  };
}
export default UIInitialState;


export type sendingMailMessage = "Sending..." | "Sent!" | "Failed to Send! Please try again."