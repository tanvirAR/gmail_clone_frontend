export interface emailSlice {
  currentSelected: currSelected;
  selectedMails: string[];
}

type currSelected =
  | "allMail"
  | "none"
  | "read"
  | "unRead"
  | "starred"
  | "unStarred"
  | "custom"
  | "important"
  | "unImportant";
