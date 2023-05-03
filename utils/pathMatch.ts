
export default function pathMatch(path: string): string {
  if (path.startsWith("/mail/u/")) {
    switch (path.slice(path.lastIndexOf("/") + 1)) {
      case "inbox":
      case "starred":
      case "snoozed":
      case "important":
      case "sent":
      case "drafts":
      case "scheduled":
      case "spam":
      case "trash":
        return path.slice(path.lastIndexOf("/") + 1);
    }
  }
  return "";
}