export interface emailSearchQuery {
  from?: string;
  to?: string;
  hasWords?: string[];
  doesNotHaveWords?: string[];
  subject?: string;
  type?: string;
  dateWithIn?: string | number;
  hasAttachment?: boolean;
}