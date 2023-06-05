import {
  inboxType,
  importantType,
  scheduledType,
  sentType,
  snoozedType,
  spamType,
  starredType,
  trashType,
} from "../interface/EmailType";

import { emailApi } from "../features/email/emailApi";
import { starredEmailApi } from "../features/starredEmail/starredEmailApi";
import { importantEmailApi } from "../features/importantEmail/importantEmailApi";
import { scheduledEmailApi } from "../features/scheduledMail/scheduledMailApi";
import { snoozedEmailApi } from "../features/snoozedMail/snoozedMailApi";
import { trashEmailApi } from "../features/trashMail/trashMailApi";
import { sentMailApi } from "../features/sentMail/sentMailApi";
import { spamMailApi } from "../features/spamMail/spamMailApi";


/* this is used in apiSLice to update cache query data depending on each mail */

export default function extractEmailAPiAndendpoint(type: any) {
  let api;
  let endpoint;

  switch (type) {
    case inboxType:
      api = emailApi;
      endpoint = "getAllMails";
      break;
    case starredType:
      api = starredEmailApi;
      endpoint = "getStarredMails";
      break;
    case importantType:
      api = importantEmailApi;
      endpoint = "getImportantMails";
      break;
    case scheduledType:
      api = scheduledEmailApi;
      endpoint = "getAllScheduledMails";
      break;
    case snoozedType:
      api = snoozedEmailApi;
      endpoint = "getAllSnoozedMails";
      break;
    case trashType:
      api = trashEmailApi;
      endpoint = "getTrashMails";
      break;
    case sentType:
      api = sentMailApi;
      endpoint = "getSentMails";
      break;

    case spamType:
      api = spamMailApi;
      endpoint = "getSpamMails";
      break;

    /* default case will note be triggered unless any malfunction  */
    default:
      api = emailApi;
      endpoint = "getAllMails";
  }

  return { api, endpoint };
}
