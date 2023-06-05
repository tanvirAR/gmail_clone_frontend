import styles from "./SingleEmail.module.css";
import { email } from "../../interface/singleMail.interface";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeMailFromSelectedList,
  removeMailFromSelectedMailsWithPropsList,
  resetSelectedMails,
  setSelectedMails,
  setSelectedMailsWithProps,
} from "../../features/email/emailSlice";
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";

import {
  useMarkMailAsImportantMutation,
  useMarkMailAsUnImportantMutation,
} from "../../features/importantEmail/importantEmailApi";
import {
  useMarkMailAsStarredMutation,
  useMarkMailAsUnStarredMutation,
} from "../../features/starredEmail/starredEmailApi";
import { useGetAdditionalSingleMailPropertyQuery } from "../../features/additionalEmailData/additionalEmailDataApi";
import {
  useMarkReadSingleMailMutation,
  useMarkUnReadSingleMailMutation,
} from "../../features/readMail/readMailApi";
import { useMarkTrashSingleInboxMailMutation } from "../../features/trashMail/trashMailApi";
import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import { searchedEmailType, sentType } from "../../interface/EmailType";
import SnoozeOption from "./SnoozeOption";
import {
  setMailIdForSnoozed,
  setSnoozedMailTimeComponent,
} from "../../features/UI/UISlice";
import { accountNumber } from "../../constants/constants";
import { singleMailAdditionalData } from "../../interface/additionalEmailDataSlice.interafce";
import AdditionalEmailDataHandler from "./AdditionalEmailDataHandler";
import CheckBoxHandler from "./CheckBoxHandler";

interface props {
  property: email;
  buttonRef?: any;
  pageType: emailType;

  // only needed and applicaple when page is on searched mail result
  searchedMailQuery?: string;
}

export default function SingleEmail(props: props) {
  const dispatch = useDispatch();
  const { email, additionalEmailData, auth } = useSelector(
    (state: storeStateInterface) => state
  );

  const { currentSelected, selectedMails } = email;

  const {
    buttonRef,
    pageType,
    searchedMailQuery,
    property: emailProperty,
  } = props;

  const { message, subject, senderName, createdAt, id, senderEmail } =
    props.property;
  const [idLoaded, setIdLoaded] = useState(false);

  const [checkBox, setCheckBox] = useState(false);
  const [snoozeOptionShow, setSnoozeOptionShow] = useState(false);
  const snoozeOptionButtonRef = useRef<HTMLSpanElement | null>(null);

  // get mail additional property sending request
  const {
    data: additiionalEmailData,
    refetch: refetchAdditionalMailData,
    isFetching,
  } = useGetAdditionalSingleMailPropertyQuery(id, {
    skip: !idLoaded,
  });
  useEffect(() => {
    if (id) {
      setIdLoaded(true);
    }
  }, [id]);

  const [markMailAsImportant, { isLoading: isMarkingMailAsImportantLoading }] =
    useMarkMailAsImportantMutation();

  const [
    markMailAsUnImportant,
    { isLoading: isMarkingMailAsUnImportantLoading },
  ] = useMarkMailAsUnImportantMutation();

  const [markMailAsStarred, { isLoading: starredLoading }] =
    useMarkMailAsStarredMutation();

  const [markMailAsUnStarred, { isLoading: unStarredLoading }] =
    useMarkMailAsUnStarredMutation();

  // email read & unread mutation request
  const [markReadSingleMail, {}] = useMarkReadSingleMailMutation();
  const [markUnReadSingleMail, {}] = useMarkUnReadSingleMailMutation();

  const [markTrashSingleInboxMail, {}] = useMarkTrashSingleInboxMailMutation();

  const time = moment(createdAt);

  const router = useRouter();

  const { mail } = additiionalEmailData || {};
  const { important, starred, read } = (mail as singleMailAdditionalData) || {};

  // route to single email page
  const openSingleMailHandler = () => {
    // before visiting a single mail page, mark the email read property to true
    if (!read) {
      markReadSingleMail({ mailId: id });
    }
    // reset selected mails slice before changing pages
    dispatch(resetSelectedMails());
    if (pageType === searchedEmailType) {
      router.push(
        `/mail/u/${accountNumber}/${pageType}/${searchedMailQuery}/${id}`
      );
    } else {
      router.push(`/mail/u/${accountNumber}/${pageType}/${id}`);
    }
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
    markTrashSingleInboxMail({mailId: id, mailProperty: emailProperty, pageType});
  };

  const markMailAsImportantHandler = () => {
    // tell the rtk quey to send request by disabling skip option
    if (!isMarkingMailAsImportantLoading) {
      if (important) {
        markMailAsUnImportant(id);
      } else {
        markMailAsImportant({ mailId: id, emailProperty: props.property });
      }
    }
  };

  const markMailAsStarredHandler = () => {
    // tell the rtk quey to send request by disabling skip option
    if (!starredLoading) {
      if (starred) {
        markMailAsUnStarred(id);
      } else {
        markMailAsStarred({ mailId: id, emailProperty: props.property });
      }
    }
  };

  /*  additional data refetch handler. the button component is in another child of parent component
     which is brought down here by useRef. When user click refetch button on Options Component, all emails will be refetched as well as 
     this specific additionalEmailData will also be refetched by dynamically executing a click event. The click event is executed in Options Container
     and lister is used here to refetch additional email data  which has dynamic api to the server   */
  useEffect(() => {
    const currentRef = buttonRef.current;

    currentRef.addEventListener("click", refetchAdditionalMailData);

    return () => {
      currentRef.removeEventListener("click", refetchAdditionalMailData);
    };
  }, [buttonRef, refetchAdditionalMailData]);

  // use to add mails that are selected by user in the emailSlice to execute CRUD operation with each mail.
  useEffect(() => {
    if (checkBox) {
      dispatch(setSelectedMails(id));
      dispatch(setSelectedMailsWithProps(emailProperty));
    } else if (selectedMails.includes(id) && !checkBox) {
      dispatch(removeMailFromSelectedList(id));
      dispatch(removeMailFromSelectedMailsWithPropsList(id));
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

  const classesForMainDiv = `${styles["email_row"]} ${
    read ? styles.read : styles.unread
  } ${!starred ? styles.starColorHover : ""} ${
    checkBox ? styles.selected : ""
  } ${snoozeOptionShow ? styles.snoozeToggled : ""}`;

 const emailSenderName = pageType===sentType ? "You" : ( senderEmail == auth?.user?.email ? "You" : senderName);

  return (
    <div className={classesForMainDiv} onClick={openSingleMailHandler}>
      <AdditionalEmailDataHandler
        additionalEmailData={additionalEmailData}
        isFetching={isFetching}
        mail={mail}
        pageType={pageType}
      />
      <CheckBoxHandler
        currentSelected={currentSelected}
        important={important}
        read={read}
        setCheckBox={setCheckBox}
        starred={starred}
        selectedMails={selectedMails}
        checkBoxChecked={checkBox}
        emailId={id}
      />
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
      <h3 className={styles["emailRow_title"]}>{emailSenderName}</h3>
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
