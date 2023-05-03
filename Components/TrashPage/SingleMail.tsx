import styles from "./SingleMail.module.css";
import { email } from "../../interface/singleMail.interface";
import moment from "moment";
import { useRouter } from "next/router";
import {
  useGetAdditionalSingleMailPropertyQuery,
  useMarkReadSingleMailMutation,
  useMarkUnReadSingleMailMutation,
} from "../../features/email/emailApi";
import React, { useEffect, useState } from "react";

interface props {
  property: email;
}

export default function SingleEmail(props: props) {
  const { message, subject, senderName, createdAt, id } = props.property;
  const [idLoaded, setIdLoaded] = useState(false);

  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    if (id) {
      setIdLoaded(true);
    }
  }, [id]);

  const time = moment(createdAt);

  const router = useRouter();

  // get mail addition property
  const { data: additiionalEmailData } =
    useGetAdditionalSingleMailPropertyQuery(id, {
      skip: !idLoaded,
    });

  const { mail } = additiionalEmailData || {};
  const { important, starred, read } = mail || {};

  const [markReadSingleMail, {}] = useMarkReadSingleMailMutation();
  const [markUnReadSingleMail, {}] = useMarkUnReadSingleMailMutation();

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
    if (read) {
      markUnReadSingleMail({ mailId: id });
    } else {
      markReadSingleMail({ mailId: id });
    }
  };

  const markDeleteMailHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${styles["email_row"]} ${
        read ? styles.read : styles.unread
      } ${!starred ? styles.starColorHover : ""}`}
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
        <span className="material-symbols-outlined">delete</span>
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
