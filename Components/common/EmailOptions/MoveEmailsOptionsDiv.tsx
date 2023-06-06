import { useEffect, useRef } from "react";
import styles from "./MoveEmailsOptionsDiv.module.css";
import { useSelector } from "react-redux";
import storeStateInterface from "../../../interface/Store.interface";
import { useMarkMailAsSpamMutation } from "../../../features/spamMail/spamMailApi";
import { useMarkTrashSingleInboxMailMutation } from "../../../features/trashMail/trashMailApi";
import { emailType } from "../../../interface/EmailTypeForSpecificPage.interface";
import {
  importantType,
  inboxType,
  sentType,
  spamType,
  starredType,
  trashType,
} from "../../../interface/EmailType";
import {
  useMoveFromSentToInboxMutation,
  useMoveFromSpamToInboxMutation,
  useMoveFromTrashToInboxMutation,
} from "../../../features/moveEmail/moveEmailApi";
import { useDispatch } from "react-redux";
import { resetSelectedMails } from "../../../features/email/emailSlice";


interface props {
  setShowComponent: any;
  toggleButtonRef: any;
  pageType: emailType;
}


export default function MoveEmailOptionsDiv(props: props) {
const dispatch = useDispatch();

  const { setShowComponent, toggleButtonRef, pageType } = props;
  const thisCompRef = useRef<HTMLDivElement | null>(null);

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

  const [markMailAsTrash, {}] = useMarkTrashSingleInboxMailMutation();
  const [markMailAsSpam, {}] = useMarkMailAsSpamMutation();

  const { email } = useSelector(
    (state: storeStateInterface) => state
  );
  const { selectedMails, selectedMailsWithProps } = email;

  const moveToSpamHandler = () => {
    for (let i = 0; i < selectedMails.length; i++) {
      const mailId = selectedMails[i];
      const mailPrimaryProperty = selectedMailsWithProps.filter(
        (mail) => mail.id == mailId
      )[0];
      markMailAsSpam({ mailId, mailProperty: mailPrimaryProperty, pageType });
    }
    // close this component after sending request
    setShowComponent(false);
    dispatch(resetSelectedMails())
  };

  const moveToTrashHandler = () => {
    for (let i = 0; i < selectedMails.length; i++) {
      const mailId = selectedMails[i];
      const mailPrimaryProperty = selectedMailsWithProps.filter(
        (mail) => mail.id == mailId
      )[0];
      console.log(mailId);
      markMailAsTrash({ mailId, mailProperty: mailPrimaryProperty, pageType });
    }
    // close this component after sending request
    setShowComponent(false);
     dispatch(resetSelectedMails());
  };

  const [moveFromSentToInbox, { isLoading: sentToInboxIsLoading }] =
    useMoveFromSentToInboxMutation();
  const [moveFromSpamToInbox, { isLoading: spamToInboxIsLoading }] =
    useMoveFromSpamToInboxMutation();
  const [moveFromTrashToInbox, { isLoading: trashToInboxIsLoading }] =
    useMoveFromTrashToInboxMutation();

  const moveEmailToInboxHandler = () => {
    if (
      selectedMails.length > 0 &&
      !sentToInboxIsLoading &&
      !spamToInboxIsLoading &&
      !trashToInboxIsLoading
    ) {
      if (pageType === sentType) {
        for (let i = 0; i < selectedMails.length; i++) {
             const mailId = selectedMails[i];
             const mailPrimaryProperty = selectedMailsWithProps.filter(
               (mail) => mail.id == mailId
             )[0];
          moveFromSentToInbox({ mailId, mailProperty: mailPrimaryProperty });
        }
        // close the component after request
         setShowComponent(false);
          dispatch(resetSelectedMails());
      } else if (pageType === spamType) {
        for (let i = 0; i < selectedMails.length; i++) {
          const mailId = selectedMails[i];
          const mailPrimaryProperty = selectedMailsWithProps.filter(
            (mail) => mail.id == mailId
          )[0];
          moveFromSpamToInbox({ mailId, mailProperty: mailPrimaryProperty });
        }
        // close the component after request
        setShowComponent(false);
         dispatch(resetSelectedMails());
      } else if (pageType === trashType) {
        for (let i = 0; i < selectedMails.length; i++) {
          const mailId = selectedMails[i];
          const mailPrimaryProperty = selectedMailsWithProps.filter(
            (mail) => mail.id == mailId
          )[0];
          moveFromTrashToInbox({ mailId, mailProperty: mailPrimaryProperty });
        }
        // close the component after request
        setShowComponent(false);
         dispatch(resetSelectedMails());
      }
    }
  };

  // if user is in trash page, hide the "move to trash" option
  const isTrashOptionVisible: boolean = pageType !== trashType;
  const isInboxOptionVisible: boolean =
    pageType !== inboxType &&
    pageType !== spamType &&
    pageType !== importantType &&
    pageType !== starredType;
  const isSpamOptionVisible: boolean = pageType !== spamType;
  // const isTrashOptionVisible: boolean =
  return (
    <div ref={thisCompRef} className={styles.main}>
      <div className={styles.title}>
        <p>Move to:</p>
      </div>

      <div className={styles.line1}></div>

      {isInboxOptionVisible && (
        <div onClick={moveEmailToInboxHandler}>
          <p>Inbox</p>
        </div>
      )}

      {isSpamOptionVisible && (
        <div onClick={moveToSpamHandler}>
          <p>Spam</p>
        </div>
      )}
      {isTrashOptionVisible && (
        <div onClick={moveToTrashHandler}>
          <p>Trash</p>
        </div>
      )}
    </div>
  );
}
