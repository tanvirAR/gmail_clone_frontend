import { useRouter } from "next/router";
import styles from "./EmailOptions.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  useGetAdditionalSingleMailPropertyQuery,
  useMarkTrashSingleInboxMailQuery,
  useMarkMailAsSpamMutation,
  useMarkReadSingleMailMutation,
  useMarkUnReadSingleMailMutation,
} from "../../features/email/emailApi";

interface props {
  mailId: string | undefined;
}

export default function EmailOptions(props: props) {
  const router = useRouter();
  const { mailId } = props;
  const [mailIdLoaded, setMailIdLoaded] = useState(false);
  useEffect(() => {
    if (mailId) {
      setMailIdLoaded(true);
    }
  }, [mailId]);
  const redirectToInboxPageHandler = () => {
    router.push("/mail/u/1/inbox");
  };
  const [deletRequest, setDeleteRequest] = useState(false);

  const { data: markTrashResponseData } = useMarkTrashSingleInboxMailQuery(mailId || "", {
    skip: !deletRequest || !mailIdLoaded,
  });

  // make skip to false to send request to the backend to mark this mail as deleted
  const markDeleteMailHandler = () => {
    setDeleteRequest(true);
  };

  const [markMailAsSpam, { data: spamMarkResponseData }] =
    useMarkMailAsSpamMutation();


  // after deleting a mail , redirect to inbox page
  if (markTrashResponseData || spamMarkResponseData) {
    redirectToInboxPageHandler();
  }

  // get additional email data which is specific for end user (this.user)
  const { data: additiionalEmailData } =
    useGetAdditionalSingleMailPropertyQuery(mailId || "", {
      skip: !mailIdLoaded,
    });

  const { mail } = additiionalEmailData || {};
  const { important, starred, read } = mail || {};

  const [markReadSingleMail, {}] = useMarkReadSingleMailMutation();
  const [markUnReadSingleMail, {}] = useMarkUnReadSingleMailMutation();

  const manualUpdataMailReadUnreadProp = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    if (mailId) {
      if (read) {
        markUnReadSingleMail({ mailId: mailId || "" });
      } else {
        markReadSingleMail({ mailId: mailId });
      }
    }
  };

  const markMailAsSpamHandler = () => {
    if (mailId) {
    markMailAsSpam({mailId: mailId})
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSegment}>
        <div className={styles.icon} onClick={redirectToInboxPageHandler}>
          <div className={styles.back}>
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
        </div>
        <div className={styles.icon}>
          <span onClick={markMailAsSpamHandler} className={"material-symbols-outlined"}>report</span>
        </div>
        <div onClick={markDeleteMailHandler} className={styles.icon}>
          <span className="material-symbols-outlined">delete</span>
        </div>
        <div className={styles.icon}>
          <span
            onClick={manualUpdataMailReadUnreadProp}
            className="material-symbols-outlined"
          >
            {read ? "mail" : "drafts"}
          </span>
        </div>
        <div className={styles.icon}>
          <span className="material-symbols-outlined">schedule</span>
        </div>
      </div>

      <div className={styles.rightSegment}>
        <p>1 of 308</p>
        <div className={styles.icon}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <div className={styles.icon}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </div>
    </div>
  );
}
