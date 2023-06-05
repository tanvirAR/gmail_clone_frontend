import React, { useEffect } from "react";
import { currSelected } from "../../interface/EmailSliceInterface";
import { email } from "../../interface/singleMail.interface";

interface props {
  currentSelected: currSelected;
  important: boolean | undefined;
  starred: boolean | undefined;
  read: boolean | undefined;
  setCheckBox: any;
  selectedMails: string[];
  emailId: string;
  checkBoxChecked: boolean;
}

export default function CheckBoxHandler(props: props) {
  const {
    currentSelected,
    important,
    read,
    starred,
    setCheckBox,
    selectedMails,
    emailId,
    checkBoxChecked,
  } = props;

  // control what types of mail  is selected from (SelectMailByCategoryComponent)
  useEffect(() => {
    setCheckBox(false);
    switch (currentSelected) {
      case "allMail":
        setCheckBox(true);
        break;

      case "important":
        if (important) {
          setCheckBox(true);
        }
        break;

      case "read":
        if (read) {
          setCheckBox(true);
        }
        break;

      case "unRead":
        if (!read) {
          setCheckBox(true);
        }
        break;

      case "starred":
        if (starred) {
          setCheckBox(true);
        }
        break;

      case "unStarred":
        if (!starred) {
          setCheckBox(true);
        }
        break;

      case "unImportant":
        if (!important) {
          setCheckBox(true);
        }
        break;

      case "none":
        setCheckBox(false);
        break;
    }
  }, [currentSelected, important, starred, read]);

  useEffect(() => {
    const isCurrentMailSelected: boolean =
      selectedMails.filter((id) => id == emailId).length > 0;
    if (isCurrentMailSelected) {
      if (!checkBoxChecked) {
        setCheckBox(true);
      }
    } else {
      if (checkBoxChecked) {
        setCheckBox(false);
      }
    }
  }, [selectedMails]);

  return null;
}
