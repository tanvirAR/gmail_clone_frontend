import styles from "./SingleEmail.module.css";
import { email } from "../../interface/singleMail.interface";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeMailFromSelectedList,
  setSelectedMails,
} from "../../features/email/emailSlice";
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";
import { setInboxEmailAdditionalData } from "../../features/additionalEmailData/additionalEmailDataSlice";
import { useMarkMailAsImportantMutation } from "../../features/importantEmail/importantEmailApi";
import { useMarkMailAsStarredMutation } from "../../features/starredEmail/starredEmailApi";
import { useGetAdditionalSingleMailPropertyQuery } from "../../features/additionalEmailData/additionalEmailDataApi";
import {
  useMarkReadSingleMailMutation,
  useMarkUnReadSingleMailMutation,
} from "../../features/readMail/readMailApi";
import { useMarkTrashSingleInboxMailMutation } from "../../features/trashMail/trashMailApi";


interface props {
  property: email;
  buttonRef?: any;
}


export default function SingleEmail(props: props) {
  const dispatch = useDispatch();
  const { currentSelected, selectedMails } = useSelector(
    (state: storeStateInterface) => state.email
  );
  const { buttonRef } = props;
  const { message, subject, senderName, createdAt, id } = props.property;
  const [idLoaded, setIdLoaded] = useState(false);

  const [checkBox, setCheckBox] = useState(false);

  // get mail addition property
  const { data: additiionalEmailData, refetch: refetchAdditionalMailData } =
    useGetAdditionalSingleMailPropertyQuery(id, {
      skip: !idLoaded,
    });

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
    if (mail) {
      dispatch(setInboxEmailAdditionalData(mail));
    }
  }, [mail, dispatch]);

  // route to single email page
  const openSingleMailHandler = () => {
    // before visiting a single mail page, mark the email read property to true
    if (!read) {
      markReadSingleMail({ mailId: id });
    }

    router.push(`/mail/u/0/inbox/${id}`);
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

  return (
    <div
      className={`${styles["email_row"]} ${
        read ? styles.read : styles.unread
      } ${!starred ? styles.starColorHover : ""} ${
        checkBox ? styles.selected : ""
      }`}
      onClick={openSingleMailHandler}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles["emailRow_options"]} ${
          important ? styles.labelFill : ""
        } ${starred ? styles.starFill : ""}`}
      >
        {/* <input type="checkbox" id={styles.myCheckBox} /> */}
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

      <div className={styles.leftDiv}>
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
          <div className={`${styles.leftIcon} ${styles.clock}`}>
            <span className="material-symbols-outlined">schedule</span>
          </div>
        </div>
        <div className={styles.time}>{time.format("MMM D")}</div>
      </div>
    </div>
  );
}
