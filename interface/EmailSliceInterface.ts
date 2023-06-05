import { email } from "./singleMail.interface";

export interface emailSlice {
  currentSelected: currSelected;
  selectedMails: string[];
  selectedMailsWithProps: email[];
}

export type currSelected =
  | "allMail"
  | "none"
  | "read"
  | "unRead"
  | "starred"
  | "unStarred"
  | "custom"
  | "important"
  | "unImportant";
