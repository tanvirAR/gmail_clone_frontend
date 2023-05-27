import {
  searchMailType,
  allMail,
  allMailUI,
  inbox,
  inboxUI,
  read,
  readUI,
  sent,
  sentMailUI,
  spam,
  spamAndTrash,
  spamAndTrashUI,
  spamUI,
  starred,
  starredUI,
  trash,
  trashUI,
  unReadUI,
  unread,
} from "../interface/searchEmailCategory.interface";

export default function getCategoryName(type: searchMailType) {
  let name;
  switch (type) {
    case allMail:
      name = allMailUI;
      break;

    case inbox:
      name = inboxUI;
      break;

    case starred:
      name = starredUI;
      break;

    case sent:
      name = sentMailUI;
      break;

    case spam:
      name = spamUI;
      break;

    case trash:
      name = trashUI;
      break;

    case spamAndTrash:
      name = spamAndTrashUI;
      break;

    case read:
      name = readUI;
      break;

    case unread:
      name = unReadUI;
      break;
  }

  return name;
}
