import styles from "./SingleEmail.module.css";
import { email } from "../../interface/singleMail.interface";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeMailFromSelectedList,
  resetSelectedMails,
  setSelectedMails,
} from "../../features/email/emailSlice";
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";
import {
  setImportantEmailAdditionalData,
  setInboxEmailAdditionalData,
  setScheduledEmailAdditionalData,
  setSnoozedEmailAdditionalData,
  setSentEmailAdditionalData,
  setSpamEmailAdditionalData,
  setStarredEmailAdditionalData,
  setTrashEmailAdditionalData,
} from "../../features/additionalEmailData/additionalEmailDataSlice";
import { useMarkMailAsImportantMutation } from "../../features/importantEmail/importantEmailApi";
import { useMarkMailAsStarredMutation } from "../../features/starredEmail/starredEmailApi";
import { useGetAdditionalSingleMailPropertyQuery } from "../../features/additionalEmailData/additionalEmailDataApi";
import {
  useMarkReadSingleMailMutation,
  useMarkUnReadSingleMailMutation,
} from "../../features/readMail/readMailApi";
import { useMarkTrashSingleInboxMailMutation } from "../../features/trashMail/trashMailApi";
import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import {
  starredType,
  inboxType,
  draftsType,
  scheduledType,
  sentType,
  snoozedType,
  spamType,
  trashType,
  importantType,
} from "../../interface/EmailType";
import checkIfAlredyPresentInSlice from "../../utils/checkSingleEmailAdditionalDataInSlice";
import SnoozeOption from "./SnoozeOption";
import {
  setMailIdForSnoozed,
  setSnoozedMailTimeComponent,
} from "../../features/UI/UISlice";
import { accountNumber } from "../../constants/userAccountSerial";

interface props {
  property: email;
  buttonRef?: any;
  pageType: emailType;
}

export default function SingleEmail(props: props) {
  const dispatch = useDispatch();
  const { email, additionalEmailData } = useSelector(
    (state: storeStateInterface) => state
  );

  const { currentSelected, selectedMails } = email;

  const {
    important: importantEmailAdditionalDataSlice,
    inbox: inboxEmailAdditionalDataSlice,
    starred: starredEmailAdditionalDataSlice,
    sent: sentEmailAdditionalDataSlice,
    spam: spamEmailAdditionalDataSlice,
    trash: trashEmailAdditionalDataSlice,
    scheuduled: scheduledEmailAdditionalDataSlice,
    snoozed: snoozedEmailAdditionalDataSlice,
  } = additionalEmailData;

  const { buttonRef, pageType } = props;
  const { message, subject, senderName, createdAt, id } = props.property;
  const [idLoaded, setIdLoaded] = useState(false);

  const [checkBox, setCheckBox] = useState(false);
  const [snoozeOptionShow, setSnoozeOptionShow] = useState(false);
  const snoozeOptionButtonRef = useRef<HTMLSpanElement | null>(null);

  // get mail additional property sending request
  const {
    data: additiionalEmailData,
    refetch: refetchAdditionalMailData,
    isFetching,
  } = useGetAdditionalSingleMailPropertyQuery(
    { mailId: id, pageType },
    {
      skip: !idLoaded,
    }
  );

  const [markMailAsImportant, { isLoading: isMarkingMailAsImportantLoading }] =
    useMarkMailAsImportantMutation();

  const [markMailAsStarred, { isLoading: starredLoading }] =
    useMarkMailAsStarredMutation();

  // email read & unread mutation request
  const [markReadSingleMail, {}] = useMarkReadSingleMailMutation();
  const [markUnReadSingleMail, {}] = useMarkUnReadSingleMailMutation();

  const [markTrashSingleInboxMail, {}] = useMarkTrashSingleInboxMailMutation();

  useEffect(() => {
    if (id) {
      setIdLoaded(true);
    }
  }, [id]);

  const time = moment(createdAt);

  const router = useRouter();

  const { mail } = additiionalEmailData || {};
  const { important, starred, read } = mail || {};

  useEffect(() => {
    if (mail && !isFetching) {
      if (pageType === inboxType) {
        // changing router can inject additional email data multple times in slice , so checking is done before dispatch
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          inboxEmailAdditionalDataSlice,
          mail
        );
        if (!isAlreadyAddedBefore) {
          dispatch(setInboxEmailAdditionalData(mail));
        }
      } else if (pageType === starredType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          starredEmailAdditionalDataSlice,
          mail
        );
        if (!isAlreadyAddedBefore) {
          dispatch(setStarredEmailAdditionalData(mail));
        }
      } else if (pageType === importantType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          importantEmailAdditionalDataSlice,
          mail
        );
        if (!isAlreadyAddedBefore) {
          dispatch(setImportantEmailAdditionalData(mail));
        }
      } else if (pageType === sentType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          sentEmailAdditionalDataSlice,
          mail
        );
        if (!isAlreadyAddedBefore) {
          dispatch(setSentEmailAdditionalData(mail));
        }
      } else if (pageType === spamType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          spamEmailAdditionalDataSlice,
          mail
        );
        if (!isAlreadyAddedBefore) {
          dispatch(setSpamEmailAdditionalData(mail));
        }
      } else if (pageType === trashType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          trashEmailAdditionalDataSlice,
          mail
        );
        if (!isAlreadyAddedBefore) {
          dispatch(setTrashEmailAdditionalData(mail));
        }
      } else if (pageType === scheduledType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          scheduledEmailAdditionalDataSlice,
          mail
        );
        if (!isAlreadyAddedBefore) {
          dispatch(setScheduledEmailAdditionalData(mail));
        }
      } else if (pageType === snoozedType) {
        const isAlreadyAddedBefore = checkIfAlredyPresentInSlice(
          snoozedEmailAdditionalDataSlice,
          mail
        );
        if (!isAlreadyAddedBefore) {
          dispatch(setSnoozedEmailAdditionalData(mail));
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
    isFetching,
  ]);

  // route to single email page
  const openSingleMailHandler = () => {
    // before visiting a single mail page, mark the email read property to true
    if (!read) {
      markReadSingleMail({ mailId: id });
    }
    // reset selected mails slice before changing pages
    dispatch(resetSelectedMails());
    router.push(`/mail/u/${accountNumber}/${pageType}/${id}`);
  };

  const manualUpdataMailReadUnreadProp = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    // console.log(id)
    if (read) {
      markUnReadSingleMail({ mailId: id });
    } else {
      markReadSingleMail({ mailId: id });
    }
  };

  const markDeleteMailHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    markTrashSingleInboxMail(id);
  };

  const markMailAsImportantHandler = () => {
    // tell the rtk quey to send request by disabling skip option
    if (!isMarkingMailAsImportantLoading) {
      markMailAsImportant(id);
    }
  };

  const markMailAsStarredHandler = () => {
    // tell the rtk quey to send request by disabling skip option
    if (!starredLoading) {
      markMailAsStarred(id);
    }
  };

  //  additional data refetch handler. the button component is in another child of parent component
  //   which is brought down here by useRef
  useEffect(() => {
    const currentRef = buttonRef.current;

    currentRef.addEventListener("click", refetchAdditionalMailData);

    return () => {
      currentRef.removeEventListener("click", refetchAdditionalMailData);
    };
  }, [buttonRef, refetchAdditionalMailData]);

  // controll what types of mail  is selected from (SelectMailByCategoryComponent)
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

  // use to add mails that are selected by user in the emailSlice to execute CRUD operation with each mail.
  useEffect(() => {
    if (checkBox) {
      dispatch(setSelectedMails(id));
    } else if (selectedMails.includes(id) && !checkBox) {
      dispatch(removeMailFromSelectedList(id));
    } else {
      return;
    }
  }, [checkBox]);

  const showSnoozeOptionHandler = () => {
    setSnoozeOptionShow((prevState) => !prevState);
  };

  const snoozeRequestHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setMailIdForSnoozed(id));
    dispatch(setSnoozedMailTimeComponent(true));
  };

  return (
    <div
      className={`${styles["email_row"]} ${
        read ? styles.read : styles.unread
      } ${!starred ? styles.starColorHover : ""} ${
        checkBox ? styles.selected : ""
      } ${snoozeOptionShow ? styles.snoozeToggled : ""}`}
      onClick={openSingleMailHandler}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles["emailRow_options"]} ${
          important ? styles.labelFill : ""
        } ${starred ? styles.starFill : ""}`}
      >
        <span
          onClick={() => setCheckBox((prev) => !prev)}
          className="material-symbols-outlined"
        >
          {checkBox ? "check_box" : "check_box_outline_blank"}
        </span>
        <span
          onClick={markMailAsStarredHandler}
          className="material-symbols-outlined"
        >
          star
        </span>
        <span
          onClick={markMailAsImportantHandler}
          className={`material-symbols-outlined`}
        >
          label_important
        </span>
      </div>

      <h3 className={styles["emailRow_title"]}>{senderName}</h3>

      <div className={styles["emailRow_message"]}>
        <h4>
          {subject}
          <span className={styles["emailRow_description"]}>{message}</span>
        </h4>
      </div>

      <div onClick={(e) => e.stopPropagation()} className={styles.leftDiv}>
        <div onClick={(e) => e.stopPropagation()} className={styles.icons}>
          <div onClick={markDeleteMailHandler} className={styles.leftIcon}>
            <span className="material-symbols-outlined">delete</span>
          </div>
          <div
            onClick={manualUpdataMailReadUnreadProp}
            className={styles.leftIcon}
          >
            <span className="material-symbols-outlined">
              {read ? "mail" : "drafts"}
            </span>
          </div>
          <div
            onClick={showSnoozeOptionHandler}
            className={`${styles.leftIcon} ${styles.clock}`}
          >
            <span
              ref={snoozeOptionButtonRef}
              className="material-symbols-outlined"
            >
              schedule
            </span>
          </div>
        </div>
        <div className={styles.time}>{time.format("MMM D")}</div>
        {snoozeOptionShow && (
          <div
            onClick={snoozeRequestHandler}
            className={styles.snoozeOptionDiv}
          >
            <SnoozeOption
              toggleButtonRef={snoozeOptionButtonRef}
              setShowComponent={setSnoozeOptionShow}
            />
          </div>
        )}
      </div>
    </div>
  );
}
