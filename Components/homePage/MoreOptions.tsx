import { useEffect, useRef, useState } from "react";
import styles from "./MoreOptions.module.css";
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";
import { useMarkMailAsImportantMutation } from "../../features/importantEmail/importantEmailApi";
import { useMarkMailAsStarredMutation } from "../../features/starredEmail/starredEmailApi";
import {
  useMarkReadSingleMailMutation,
  useMarkUnReadSingleMailMutation,
} from "../../features/readMail/readMailApi";
import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import { starredType, inboxType, importantType, sentType, spamType, trashType, scheduledType, snoozedType } from "../../interface/EmailType";
import { singleMailAdditionalData } from "../../interface/additionalEmailDataSlice.interafce";
interface props {
  setShowComponent: any;
  toggleButtonRef: any;
  pageType: emailType;
}

export default function MoreOptions(props: props) {
  const { setShowComponent, toggleButtonRef, pageType } = props;
  const thisCompRef = useRef<HTMLDivElement | null>(null);
  const { email, additionalEmailData } = useSelector(
    (state: storeStateInterface) => state
  );
  const { selectedMails } = email;
  const { inbox, important, starred, sent, trash, spam, scheuduled, snoozed } = additionalEmailData;

  const [additionalMailData, setAdditionalMailData] = useState<singleMailAdditionalData[]>([])


  useEffect(() => {
    if (pageType && important && inbox && starred && sentType) {
      if (pageType === inboxType) {
        setAdditionalMailData(inbox);
      } else if (pageType === importantType) {
        setAdditionalMailData(important);
      } else if (pageType === starredType) {
        setAdditionalMailData(starred);
      } else if (pageType === sentType) {
        setAdditionalMailData(sent);
      } else if (pageType === spamType) {
        setAdditionalMailData(spam);
      } else if (pageType === trashType) {
        setAdditionalMailData(trash);
      } else if (pageType === scheduledType) {
        setAdditionalMailData(scheuduled);
      } else if (pageType === snoozedType) {
        setAdditionalMailData(snoozed);
      }
    }
  }, [pageType, important, inbox, starred, sent, spam, trash, scheuduled, snoozed])
  
  useEffect(() => {
    // Function to handle when clicks outside the popup to hide this component
    const handleClickOutside = (event: MouseEvent) => {
      if (
        thisCompRef.current &&
        !thisCompRef.current.contains(event.target as Node)
      ) {
        // this div will close upon clicking outside but user can also clik on button which is also outside, so ref of that button is used here
        if (toggleButtonRef.current === event.target) {
          setShowComponent(true);
        } else {
          setShowComponent(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowComponent, toggleButtonRef]);

  // this component (options)  is used to render different option to UI based on the type of email selected by user to mutates them

  const isDefaultContent = selectedMails.length === 0;
  const isSingleMailSelected = selectedMails.length === 1;

  const [singleImportant, setSingleImportant] = useState(false);
  const [singleRead, setSingleRead] = useState(false);
  const [singleStarred, setSingleStarred] = useState(false);

  const [multipleImportant, setMultipleImportant] = useState(false);
  const [multipleUnImportant, setMultipleUnImportant] = useState(false);
  const [multipleRead, setMultipleRead] = useState(false);
  const [multipleUnRead, setMultipleUnRead] = useState(false);
  const [multipleStarred, setMultipleStarred] = useState(false);
  const [multipleUnStarred, setMultipleUnStarred] = useState(false);

  const [markMailAsImportant, { isLoading: isMarkingMailAsImportantLoading }] =
    useMarkMailAsImportantMutation();

  const [markMailAsStarred, { isLoading: starredLoading }] =
    useMarkMailAsStarredMutation();
  const [markReadSingleMail, {}] = useMarkReadSingleMailMutation();
  const [markUnReadSingleMail, {}] = useMarkUnReadSingleMailMutation();

  useEffect(() => {
    if (selectedMails.length === 1) {
      const themailselected = additionalMailData.filter(
        (mail) => mail.mailId == selectedMails[0]
      );
      if (themailselected.length > 0){
      if (themailselected[0].starred) {
        setSingleStarred(true);
      }
      if (themailselected[0].important) {
        setSingleImportant(true);
      }
      if (themailselected[0].read === true) {
        setSingleRead(true);
      }
    }
    }
  }, [additionalMailData, selectedMails]);

  useEffect(() => {
    if (selectedMails.length > 1) {
      let isImportant: boolean = false;
      let isUnImportant: boolean = false;
      let isStarred: boolean = false;
      let isUnStarred: boolean = false;
      let isRead: boolean = false;
      let isUnRead: boolean = false;

      for (let i = 0; i < selectedMails.length; i++) {
        const singleMail = additionalMailData.filter(
          (mailData) => mailData.mailId === selectedMails[i]
        );
        if (singleMail.length > 0) {
          if (singleMail[0].starred) {
            isStarred = true;
          } else {
            isUnStarred = true;
          }
          if (singleMail[0].important) {
            isImportant = true;
          }
          {
            isUnImportant = true;
          }
          if (singleMail[0].read) {
            // console.log(singleMail[0].mailId);
            isRead = true;
          } else {
            isUnRead = true;
          }
        }
      }

      if (isImportant) {
        setMultipleImportant(true);
      }
      if (isUnImportant) {
        setMultipleUnImportant(true);
      }

      if (isStarred) {
        setMultipleStarred(true);
      }
      if (isUnStarred) {
        setMultipleUnStarred(true);
      }
      if (isRead) {
        setMultipleRead(true);
      }
      if (isUnRead) {
        setMultipleUnRead(true);
      }
    }
  }, [additionalMailData, selectedMails]);

  const markSingleMailAsReadHandler = () => {
    const mailId = selectedMails[0];
    markReadSingleMail({ mailId });
    setShowComponent(false);
  };

  const markSingleMailAsUnReadHandler = () => {
    const mailId = selectedMails[0];
    markUnReadSingleMail({ mailId });
    setShowComponent(false);
  };

  const markSingleMailAsStarredOrUnStarredHandler = () => {
    const mailId = selectedMails[0];
    markMailAsStarred(mailId);
    setShowComponent(false);
  };

  const markSingleMailAsImportantOrUnImportantHandler = () => {
    const mailId = selectedMails[0];
    markMailAsImportant(mailId);
    setShowComponent(false);
  };

  // makes ALL the mails read property true
  const markAllEmailAsReadHandler = () => {
    for (let i = 0; i < additionalMailData.length; i++) {
      // check if this specific email read property is already true or not before sending request
      const isAlreadyReadTrue = additionalMailData[i].read;
      const { mailId } = additionalMailData[i];
      if (!isAlreadyReadTrue) {
        markReadSingleMail({ mailId });
      }
    }
    // close the component after sending request
    setShowComponent(false);
  };

  // makes all the SELECTED MAILS read property false
  const markAllSelectedEmailAsReadHandler = () => {
    for (let i = 0; i < selectedMails.length; i++) {
      const selectedMailsWithAdditionalProperty = additionalMailData.filter(
        (singleMailData) => singleMailData.mailId === selectedMails[i]
      );

      for (let j = 0; j < selectedMailsWithAdditionalProperty.length; j++) {
        // check if this specific email read property is already true or not before sending request
        const isMailReadTrue = selectedMailsWithAdditionalProperty[j].read;
        if (!isMailReadTrue) {
          markReadSingleMail({
            mailId: selectedMailsWithAdditionalProperty[j].mailId,
          });
        }
      }
    }
    // close the component after sending request
    setShowComponent(false);
  };

  // makes all the SELECTED MAILS read property false
  const markAllSelectedEmailAsUnReadHandler = () => {
    for (let i = 0; i < selectedMails.length; i++) {
      const selectedMailsWithAdditionalProperty = additionalMailData.filter(
        (singleMailData) => singleMailData.mailId === selectedMails[i]
      );

      for (let j = 0; j < selectedMailsWithAdditionalProperty.length; j++) {
        // check if this specific email read property is already true or not before sending request
        const isMailReadTrue = selectedMailsWithAdditionalProperty[j].read;
        if (isMailReadTrue) {
          markUnReadSingleMail({
            mailId: selectedMailsWithAdditionalProperty[j].mailId,
          });
        }
      }
    }
    // close the component after sending request
    setShowComponent(false);
  };

  // makes all the SELECTED MAILS read property false
  const markAllSelectedEmailAsStarredOrUnstarredHandler = (isStarred: boolean) => {
    for (let i = 0; i < selectedMails.length; i++) {
      const selectedMailsWithAdditionalProperty = additionalMailData.filter(
        (singleMailData) => singleMailData.mailId === selectedMails[i]
      );

      for (let j = 0; j < selectedMailsWithAdditionalProperty.length; j++) {
        // check if this specific email read property is already true or not before sending request
        const isMailStarredTrue = selectedMailsWithAdditionalProperty[j].starred;
        if (isMailStarredTrue === isStarred) {
          markMailAsStarred(selectedMailsWithAdditionalProperty[j].mailId);
        }
      }
    }
    // close the component after sending request
    setShowComponent(false);
  };

  // makes all the SELECTED MAILS read property false
  const markAllSelectedEmailAsImportantOrUnImportantHandler = (isImportant: boolean) => {
    for (let i = 0; i < selectedMails.length; i++) {
      const selectedMailsWithAdditionalProperty = additionalMailData.filter(
        (singleMailData) => singleMailData.mailId === selectedMails[i]
      );

      for (let j = 0; j < selectedMailsWithAdditionalProperty.length; j++) {
        // check if this specific email read property is already true or not before sending request
        const isImportantTrue = selectedMailsWithAdditionalProperty[j].important;
        if (isImportantTrue === isImportant) {
          markMailAsImportant(selectedMailsWithAdditionalProperty[j].mailId);
        }
      }
    }
    // close the component after sending request
    setShowComponent(false);
  };

  return (
    <div ref={thisCompRef} className={styles.more}>
      {/* this is the default text when no email is selected by user */}
      {isDefaultContent && (
        <>
          <div onClick={markAllEmailAsReadHandler} className={styles.firstP}>
            <p>Mark all as read</p>
          </div>
          <div className={styles.linebreak}></div>
          <div className={styles.secondP}>
            <p>Select messages to see more action</p>
          </div>
        </>
      )}

      {/* this is the options visible when only 1 email is selected by the user to show specific options related to the seleted mail to mutate */}
      {!isDefaultContent && isSingleMailSelected && (
        <>
          {!singleRead && (
            <div
              onClick={markSingleMailAsReadHandler}
              className={styles.firstP}
            >
              <p>Mark as read</p>
            </div>
          )}
          {singleRead && (
            <div
              onClick={markSingleMailAsUnReadHandler}
              className={styles.firstP}
            >
              <p>Mark as unread</p>
            </div>
          )}
          {!singleImportant && (
            <div
              onClick={markSingleMailAsImportantOrUnImportantHandler}
              className={styles.firstP}
            >
              <p>Mark as important</p>
            </div>
          )}
          {singleImportant && (
            <div
              onClick={markSingleMailAsImportantOrUnImportantHandler}
              className={styles.firstP}
            >
              <p>Mark as unimportant</p>
            </div>
          )}
          {!singleStarred && (
            <div
              onClick={markSingleMailAsStarredOrUnStarredHandler}
              className={styles.firstP}
            >
              <p>Add star</p>
            </div>
          )}
          {singleStarred && (
            <div
              onClick={markSingleMailAsStarredOrUnStarredHandler}
              className={styles.firstP}
            >
              <p>Remove star</p>
            </div>
          )}
        </>
      )}

      {/* this is when multiple email is selected by the user to render different options based on type of email selected */}

      {!isDefaultContent && !isSingleMailSelected && (
        <>
          {multipleUnRead && (
            <div
              onClick={markAllSelectedEmailAsReadHandler}
              className={styles.firstP}
            >
              <p>Mark all as read</p>
            </div>
          )}
          {multipleRead && (
            <div
              onClick={markAllSelectedEmailAsUnReadHandler}
              className={styles.firstP}
            >
              <p>Mark all as unread</p>
            </div>
          )}
          {multipleUnImportant && (
            <div
              onClick={() =>
                markAllSelectedEmailAsImportantOrUnImportantHandler(false)
              }
              className={styles.firstP}
            >
              <p>Mark all as important</p>
            </div>
          )}
          {multipleImportant && (
            <div
              onClick={() =>
                markAllSelectedEmailAsImportantOrUnImportantHandler(true)
              }
              className={styles.firstP}
            >
              <p>Mark all as unimportant</p>
            </div>
          )}
          {multipleUnStarred && (
            <div
              onClick={() =>
                markAllSelectedEmailAsStarredOrUnstarredHandler(false)
              }
              className={styles.firstP}
            >
              <p>Add stars</p>
            </div>
          )}
          {multipleStarred && (
            <div
              onClick={() =>
                markAllSelectedEmailAsStarredOrUnstarredHandler(true)
              }
              className={styles.firstP}
            >
              <p>Remove stars</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
