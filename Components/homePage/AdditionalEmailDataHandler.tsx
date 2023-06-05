import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  starredType,
  inboxType,
  scheduledType,
  sentType,
  snoozedType,
  spamType,
  trashType,
  importantType,
  searchedEmailType,
} from "../../interface/EmailType";
import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import {
  additionalEmailDataSlice,
  singleMailAdditionalData,
} from "../../interface/additionalEmailDataSlice.interafce";
import {
  setImportantEmailAdditionalData,
  setInboxEmailAdditionalData,
  setScheduledEmailAdditionalData,
  setSnoozedEmailAdditionalData,
  setSentEmailAdditionalData,
  setSpamEmailAdditionalData,
  setStarredEmailAdditionalData,
  setTrashEmailAdditionalData,
  setSearchedEmailAdditionalData,
  filterInboxMailsAdditionalData,
  filterStarredMailsAdditionalData,
  filterImportantMailsAdditionalData,
  filterSentMailsAdditionalData,
  filterSpamMailsAdditionalData,
  filterTrashMailsAdditionalData,
  filterScheduledMailsAdditionalData,
  filterSnoozedMailsAdditionalData,
  filterSearchedMailsAdditionalData,
} from "../../features/additionalEmailData/additionalEmailDataSlice";
import checkIfAlredyPresentInSlice from "../../utils/checkSingleEmailAdditionalDataInSlice";

interface props {
  pageType: emailType;
  mail: singleMailAdditionalData;
  isFetching: boolean;
  additionalEmailData: additionalEmailDataSlice;
}

export default function AdditionalEmailDataHandler(props: props) {
  const dispatch = useDispatch();
  const { isFetching, mail, pageType, additionalEmailData } = props;

  const {
    important: importantEmailAdditionalDataSlice,
    inbox: inboxEmailAdditionalDataSlice,
    starred: starredEmailAdditionalDataSlice,
    sent: sentEmailAdditionalDataSlice,
    spam: spamEmailAdditionalDataSlice,
    trash: trashEmailAdditionalDataSlice,
    scheuduled: scheduledEmailAdditionalDataSlice,
    snoozed: snoozedEmailAdditionalDataSlice,
    searchedMail: searchedEmailAdditionalDataSlice,
  } = additionalEmailData;

  useEffect(() => {
    if (mail && !isFetching) {
      if (pageType === inboxType) {
        // changing router can inject additional email data multple times in slice , so checking is done before dispatch
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          inboxEmailAdditionalDataSlice,
          mail
        );
        if (isAlreadyAddedBefore === false) {
          dispatch(setInboxEmailAdditionalData(mail));
        } else if (isAlreadyAddedBefore === undefined) {
          dispatch(filterInboxMailsAdditionalData(mail.mailId));
          dispatch(setInboxEmailAdditionalData(mail));
        }
      } else if (pageType === starredType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          starredEmailAdditionalDataSlice,
          mail
        );
        if (isAlreadyAddedBefore === false) {
          dispatch(setStarredEmailAdditionalData(mail));
        } else if (isAlreadyAddedBefore === undefined) {
          dispatch(filterStarredMailsAdditionalData(mail.mailId));
          dispatch(setStarredEmailAdditionalData(mail));
        }
      } else if (pageType === importantType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          importantEmailAdditionalDataSlice,
          mail
        );

        if (isAlreadyAddedBefore === false) {
          dispatch(setImportantEmailAdditionalData(mail));
        } else if (isAlreadyAddedBefore === undefined) {
          dispatch(filterImportantMailsAdditionalData(mail.mailId));
          dispatch(setImportantEmailAdditionalData(mail));
        }
      } else if (pageType === sentType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          sentEmailAdditionalDataSlice,
          mail
        );

        if (isAlreadyAddedBefore === false) {
          dispatch(setSentEmailAdditionalData(mail));
        } else if (isAlreadyAddedBefore === undefined) {
          dispatch(filterSentMailsAdditionalData(mail.mailId));
          dispatch(setSentEmailAdditionalData(mail));
        }
      } else if (pageType === spamType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          spamEmailAdditionalDataSlice,
          mail
        );

        if (isAlreadyAddedBefore === false) {
          dispatch(setSpamEmailAdditionalData(mail));
        } else if (isAlreadyAddedBefore === undefined) {
          dispatch(filterSpamMailsAdditionalData(mail.mailId));
          dispatch(setSpamEmailAdditionalData(mail));
        }
      } else if (pageType === trashType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          trashEmailAdditionalDataSlice,
          mail
        );

        if (isAlreadyAddedBefore === false) {
          dispatch(setTrashEmailAdditionalData(mail));
        } else if (isAlreadyAddedBefore === undefined) {
          dispatch(filterTrashMailsAdditionalData(mail.mailId));
          dispatch(setTrashEmailAdditionalData(mail));
        }
      } else if (pageType === scheduledType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          scheduledEmailAdditionalDataSlice,
          mail
        );

        if (isAlreadyAddedBefore === false) {
          dispatch(setScheduledEmailAdditionalData(mail));
        } else if (isAlreadyAddedBefore === undefined) {
          dispatch(filterScheduledMailsAdditionalData(mail.mailId));
          dispatch(setScheduledEmailAdditionalData(mail));
        }
      } else if (pageType === snoozedType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          snoozedEmailAdditionalDataSlice,
          mail
        );

        if (isAlreadyAddedBefore === false) {
          dispatch(setSnoozedEmailAdditionalData(mail));
        } else if (isAlreadyAddedBefore === undefined) {
          dispatch(filterSnoozedMailsAdditionalData(mail.mailId));
          dispatch(setSnoozedEmailAdditionalData(mail));
        }
      } else if (pageType === searchedEmailType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          searchedEmailAdditionalDataSlice,
          mail
        );

        if (isAlreadyAddedBefore === false) {
          dispatch(setSearchedEmailAdditionalData(mail));
        } else if (isAlreadyAddedBefore === undefined) {
          dispatch(filterSearchedMailsAdditionalData(mail.mailId));
          dispatch(setSearchedEmailAdditionalData(mail));
        }
      }
    }
  }, [
    mail,
    dispatch,
    pageType,
    inboxEmailAdditionalDataSlice,
    starredEmailAdditionalDataSlice,
    sentEmailAdditionalDataSlice,
    importantEmailAdditionalDataSlice,
    spamEmailAdditionalDataSlice,
    trashEmailAdditionalDataSlice,
    scheduledEmailAdditionalDataSlice,
    snoozedEmailAdditionalDataSlice,
    searchedEmailAdditionalDataSlice,
    isFetching,
  ]);

  return null;
}
