export type searchMailType =
  | typeof allMail
  | typeof inbox
  | typeof starred
  | typeof sent
  | typeof spam
  | typeof trash
  | typeof spamAndTrash
  | typeof read
  | typeof unread;

export const allMail = "allmail";
export const inbox = "inbox";
export const starred = "starred";
export const sent = "sent";
export const spam = "spam";
export const trash = "trash";
export const spamAndTrash = "spam&trash";
export const read = "read";
export const unread = "unread";





//  _____________________ UI representation texts _________________________________________ (start)

export const allMailUI = "All Mail";
export const inboxUI = "Inbox";
export const starredUI = "Starred";
export const sentMailUI = "Sent Mail";
export const spamUI = "Spam";
export const trashUI = "Trash";
export const spamAndTrashUI = "Spam & Trash";
export const readUI = "Read Mail";
export const unReadUI = "Unread Mail";


export const emailCategoryUIList: emailCategoryUIType[] = [
  allMailUI,
  inboxUI,
  starredUI,
  sentMailUI,
  spamUI,
  trashUI,
  spamAndTrashUI,
  readUI,
  unReadUI,
];

export type emailCategoryUIType =
  | typeof allMailUI
  | typeof inboxUI
  | typeof starredUI
  | typeof sentMailUI
  | typeof spamUI
  | typeof trashUI
  | typeof spamAndTrashUI
  | typeof readUI
  | typeof unReadUI;
