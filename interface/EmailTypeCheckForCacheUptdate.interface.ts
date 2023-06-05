
/*  this data type is received when an email's property is changed or mutate  to update the cache after the mutation like when an email is marked as spam if its marked spam from inbox, it will be removed from inbox mails cache but user dont know from which page the email is marked as spam , as it can be from inbox page or sent page or trash page, so after marking as trash from backend server, the backed gives back this data type which tells us,  now in which page the email will be present  , ex- if inbox is false that means the email will now not be in the inbox page and so on... so that now we can update all the requried page's caheQuery accordingly. */

export interface emailPagesTypeForCacheUpdate {
  [key: string]: boolean;
  inbox: boolean;
  starred: boolean;
  snoozed: boolean;
  sent: boolean;
  spam: boolean;
  scheduled: boolean;
  trash: boolean;
  important: boolean;
}



export const inbox = 'inbox'
export const starred = "starred";
export const snoozed = "snoozed";
export const sent = "sent";
export const spam = "spam";
export const scheduled = "scheduled";
export const trash = "trash";
export const important = "important";




export const emailTypesAsPages: Array<keyof emailPagesTypeForCacheUpdate> = [inbox, starred, snoozed, sent, spam, scheduled, trash, important]