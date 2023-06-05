import { useRouter } from "next/router";
import styles from "./EmailOptions.module.css";
import { useEffect, useState } from "react";
import { useGetAdditionalSingleMailPropertyQuery } from "../../features/additionalEmailData/additionalEmailDataApi";
import { inboxType, spamType, trashType } from "../../interface/EmailType";
import {
  useDeleteMailPermanentlyMutation,
  useMarkTrashSingleInboxMailMutation,
} from "../../features/trashMail/trashMailApi";
import { useMarkReadSingleMailMutation } from "../../features/readMail/readMailApi";
import { useMarkUnReadSingleMailMutation } from "../../features/readMail/readMailApi";
import {
  useMarkMailAsSpamMutation,
  useMarkMailAsUnSpamMutation,
} from "../../features/spamMail/spamMailApi";
import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import { accountNumber } from "../../constants/constants";

interface props {
  mailId: string | undefined;
  type: emailType;
}

export default function EmailOptions(props: props) {
  const router = useRouter();
  const { mailId, type } = props;
  const [mailIdLoaded, setMailIdLoaded] = useState(false);

  useEffect(() => {
    if (mailId) {
      setMailIdLoaded(true);
    }
  }, [mailId]);

  const redirectToInboxPageHandler = () => {
    router.push(`/mail/u/${accountNumber}/${type}`);
  };

  const [
    markMailAsTrash,
    {
      data: markTrashResponse,
      isLoading: markTrashIsLoading,
      error: markTrashResponseError,
    },
  ] = useMarkTrashSingleInboxMailMutation();
  const [
    markMailAsRead,
    {
      data: markReadResponse,
      isLoading: markReadIsLoading,
      error: markReadResponseError,
    },
  ] = useMarkReadSingleMailMutation();
  const [
    markMailAsUnred,
    {
      data: markUnReadResponse,
      isLoading: markUnReadhIsLoading,
      error: markUnReadResponseError,
    },
  ] = useMarkUnReadSingleMailMutation();

  const [
    markMailAsSpam,
    {
      data: markSpamResponse,
      isLoading: markSpamIsLoading,
      error: markSpamResponseError,
    },
  ] = useMarkMailAsSpamMutation();

  const markDeleteMailHandler = () => {
    if (mailId) {
      markMailAsTrash(mailId);

      redirectToInboxPageHandler();
    }
  };

  if (markTrashResponse) {
    console.log(markTrashResponse);
  }

  // get additional email data which is specific for end user (this.user)
  const { data: additiionalEmailData } =
    useGetAdditionalSingleMailPropertyQuery(mailId || "", {
      skip: !mailIdLoaded,
    });

  const { mail } = additiionalEmailData || {};
  const { important, starred, read } = mail || {};

  const manualUpdataMailReadUnreadProp = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    if (mailId) {
      if (read) {
        markMailAsUnred({ mailId });
      } else {
        markMailAsRead({ mailId });
      }
    }
  };

  const markMailAsSpamHandler = () => {
    if (mailId) {
      markMailAsSpam({ mailId: mailId });
    }
  };

  const [
    markMailUnspam,
    {
      data: markMailUnspamResponse,
      error: markMailUnspamError,
      isLoading: markMailUnspamIsLoading,
    },
  ] = useMarkMailAsUnSpamMutation();
  const [
    deleteMailPermenantly,
    {
      data: deleMailResponse,
      error: deleteMailErrorResponse,
      isLoading: deleteMailIsLoading,
    },
  ] = useDeleteMailPermanentlyMutation();

  const isDeleteForeverOptionVisible: boolean =
    type === spamType || type === trashType;
  const trashOptionVisible: boolean = type !== trashType || type !== spamType;
  const isNotSpamOptionVisible: boolean = type === spamType;
  const markSpamOptionVisible: boolean = type !== spamType;

  const deleteMailForeverHandler = () => {
    if (mailId && !deleteMailIsLoading) {
      deleteMailPermenantly(mailId);
      redirectToInboxPageHandler();
    }
  };

  const notSpamHandler = () => {
    if (mailId && !markMailUnspamIsLoading) {
      markMailUnspam({ mailId });
      redirectToInboxPageHandler();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSegment}>
        <div className={styles.icon} onClick={redirectToInboxPageHandler}>
          <div className={styles.back}>
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
        </div>
        {isDeleteForeverOptionVisible && (
          <div onClick={deleteMailForeverHandler} className={styles.icon2}>
            <p>Delete forever</p>
          </div>
        )}
        {isDeleteForeverOptionVisible && <div className={styles.line}></div>}
        {isNotSpamOptionVisible && (
          <div onClick={notSpamHandler} className={styles.icon2}>
            <p>Not spam</p>
          </div>
        )}
        {isNotSpamOptionVisible && <div className={styles.line}></div>}

        {markSpamOptionVisible && (
          <div className={styles.icon}>
            <span
              onClick={markMailAsSpamHandler}
              className={"material-symbols-outlined"}
            >
              report
            </span>
          </div>
        )}
        {trashOptionVisible && (
          <div onClick={markDeleteMailHandler} className={styles.icon}>
            <span className="material-symbols-outlined">delete</span>
          </div>
        )}
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
