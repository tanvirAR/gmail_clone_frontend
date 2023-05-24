export function getSnoozeTimeMessage(timeISOString: string) {
    if (timeISOString==='') {
        return ''
    } 
  const snoozeTime = new Date(timeISOString);
  const currentTime = new Date();

  const snoozeDate = snoozeTime.getDate();
  const currentDay = currentTime.getDate();

  const tomorrow = new Date();
  tomorrow.setDate(currentDay + 1);

  const options: any = {
    hour: "numeric",
    minute: "numeric",
  };

  if (snoozeTime > currentTime) {
    if (snoozeDate === currentDay) {
      return `Snoozed until Today, ${snoozeTime.toLocaleString(
        "en-US",
        options
      )}`;
    } else if (snoozeDate === tomorrow.getDate()) {
      return `Snoozed until Tomorrow ${snoozeTime.toLocaleString(
        "en-US",
        options
      )}`;
    } else {
      return `Snoozed until ${snoozeTime.toLocaleDateString("en-US")}`;
    }
  } else {
    return '';
  }
}


export function getScheduledTimeMessage(timeISOString: string) {
  if (timeISOString === "") {
    return "";
  }
  const snoozeTime = new Date(timeISOString);
  const currentTime = new Date();

  const snoozeDate = snoozeTime.getDate();
  const currentDay = currentTime.getDate();

  const tomorrow = new Date();
  tomorrow.setDate(currentDay + 1);

  const options: any = {
    hour: "numeric",
    minute: "numeric",
  };

  if (snoozeTime > currentTime) {
    if (snoozeDate === currentDay) {
      return `Send scheduled for Today, ${snoozeTime.toLocaleString(
        "en-US",
        options
      )}`;
    } else if (snoozeDate === tomorrow.getDate()) {
      return `Send scheduled for Tomorrow ${snoozeTime.toLocaleString(
        "en-US",
        options
      )}`;
    } else {
      return `Send scheduled at ${snoozeTime.toLocaleDateString("en-US")}`;
    }
  } else {
    return "";
  }
}