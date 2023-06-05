import moment from "moment";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./SingleEmailPage.module.css";

import UserIcon from "../common/icon/UserIcon";
import EmailOptions from "./EmailOptions";
import { setAttachmentView } from "../../features/UI/UISlice";
import storeStateInterface from "../../interface/Store.interface";
import { useGetSingleMailQuery } from "../../features/singleEmail/singleEmailApi";
import { useGetAdditionalSingleMailPropertyQuery } from "../../features/additionalEmailData/additionalEmailDataApi";
import { inboxType, scheduledType } from "../../interface/EmailType";
import { useMarkMailAsStarredMutation } from "../../features/starredEmail/starredEmailApi";
import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import { useCancellSnoozeMailMutation } from "../../features/snoozedMail/snoozedMailApi";
import {
  getScheduledTimeMessage,
  getSnoozeTimeMessage,
} from "../../utils/timeFormat";
import { useCancellScheduledMailMutation } from "../../features/scheduledMail/scheduledMailApi";
import { accountNumber } from "../../constants/constants";

interface prop {
  emailId: string | undefined;
  type: emailType;
}

const SingleEmailPage = (props: prop) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { emailId: mailId, type } = props;
  const [idLoaded, setIdLoaded] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mailMessage, setMailMessage] = useState("");

  // use to specify the message field height according to message length
  useEffect(() => {
    if (textareaRef.current) {
      const computedStyle = window.getComputedStyle(textareaRef.current);
      const padding =
        parseFloat(computedStyle.paddingTop) +
        parseFloat(computedStyle.paddingBottom);
      const border =
        parseFloat(computedStyle.borderTopWidth) +
        parseFloat(computedStyle.borderBottomWidth);
      const textareaHeight = `${
        textareaRef.current.scrollHeight - padding - border
      }px`;
      textareaRef.current.style.height = textareaHeight; // set textarea height to inner height
    }
  }, [textareaRef, mailMessage]);

  useEffect(() => {
    if (mailId) {
      setIdLoaded(true);
    }
  }, [mailId]);

  const [
    markMailAsStarred,
    {
      data: markStarredResponse,
      error: markStarredError,
      isLoading: markStarredIsLoading,
    },
  ] = useMarkMailAsStarredMutation();

  const { data: additiionalEmailData } =
    useGetAdditionalSingleMailPropertyQuery(
      { mailId: mailId || "", pageType: inboxType },
      {
        skip: !idLoaded,
      }
    );

  const { mail: additionalData } = additiionalEmailData || {};
  const { important, starred, read, snoozedTime } = additionalData || {};

  const { onByToggle } = useSelector(
    (state: storeStateInterface) => state.UI.sidebarOn
  );

  const { data, isError, isLoading, isSuccess } = useGetSingleMailQuery(
    mailId || "",
    {
      skip: !idLoaded,
    }
  );

  useEffect(() => {
    if(isError) {
      redirectToEmailListPageHandler()
    }
  }, [isError])

 

  const { mail } = data || {};
  const { senderName, senderEmail, subject, createdAt, message, attachment } =
    mail || {};

  const viewAttachmentFullScreenHandler = () => {
    dispatch(setAttachmentView({ isVisible: true, url: attachment }));
  };

  const markMailAsStarredHandler = () => {
    if (!markStarredIsLoading && mailId) {
      markMailAsStarred(mailId);
    }
  };

  useEffect(() => {
    if (message) {
      setMailMessage(message);
    }
  }, [message]);

  const redirectToEmailListPageHandler = () => {
    router.push(`/mail/u/${accountNumber}/${type}`);
  };

  const [
    cancellSnooze,
    {
      data: mailSnoozeCancellResponse,
      error: mailSnoozeCancellError,
      isLoading: mailSnoozeCancellIsLoading,
    },
  ] = useCancellSnoozeMailMutation();

  const [
    cancelScheduledSend,
    {
      data: cancelScheduledResponse,
      error: cancelScheduledErrorResponse,
      isLoading: cancelScheduledIsLoading,
    },
  ] = useCancellScheduledMailMutation();

  const cancelSnoozeHandler = () => {
    if (mailId && !mailSnoozeCancellIsLoading)
      // sent rtk request
      cancellSnooze({ mailId });
  };

  const cancelScheduledSendHandler = () => {
    if (mailId && !cancelScheduledIsLoading)
      // sent rtk request
      cancelScheduledSend(mailId);
  };

  const snoozeTime = getSnoozeTimeMessage(snoozedTime || "");
  const cancellSnoozeOptionVisible: boolean = snoozeTime !== "";
  const scheduledCancelMessage = getScheduledTimeMessage(createdAt);
  const cancelScheduledOptionVisible: boolean =
    type === scheduledType && scheduledCancelMessage !== "";

  return (
   !isLoading && !isError && (<>
      <div
        style={!onByToggle ? { marginLeft: "4.5rem" } : {}}
        className={styles.container}
      >
        <EmailOptions type={type} mailId={mailId} />
        {cancellSnoozeOptionVisible && (
          <div className={styles.unsnoozeOption}>
            <p>{snoozeTime}</p>
            <p onClick={cancelSnoozeHandler}>Unsnooze</p>
          </div>
        )}
        {cancelScheduledOptionVisible && (
          <div className={styles.unsnoozeOption}>
            <p>{scheduledCancelMessage}</p>
            <p onClick={cancelScheduledSendHandler}>Cancel send</p>
          </div>
        )}
        <div className={styles.subjectDiv}>
          <b>
            <p>{subject}</p>
          </b>
        </div>

        <div className={styles.info}>
          <div className={styles.leftSegment}>
            <div className={styles.user}>
              <UserIcon />
            </div>
            <div className={styles.descript}>
              <p>{senderName}</p>
              <p>&lt;{senderEmail}&gt;</p>
            </div>
          </div>

          <div
            className={`${styles.rightSegment} ${starred ? styles.fill : ""}`}
          >
            <div>
              <b>
                <p>{moment(createdAt).format("MMMM D YYYY, h:mm A")}</p>
              </b>
            </div>
            <span
              onClick={markMailAsStarredHandler}
              className="material-symbols-outlined"
            >
              star
            </span>
            <span
              onClick={redirectToEmailListPageHandler}
              className="material-symbols-outlined"
            >
              reply
            </span>
          </div>
        </div>

        <div className={styles.messageField}>
          <textarea readOnly value={message} ref={textareaRef} />
          <div className={styles.lineBreak}></div>

          {attachment && (
            <div
              onClick={viewAttachmentFullScreenHandler}
              className={styles.attachmentImg}
            >
              <Image
                alt=""
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(min-width: 50px) 50vw, 500px"
                src={attachment}
              />
              <div className={styles.shade}>
                <div className={styles.fileName}>
                  <span className="material-symbols-outlined">image</span>
                  <p>Attachment</p>
                </div>
                <div className={styles.filesize}>
                  <p>2.9MB</p>
                </div>
                <div className={styles.options}>
                  <span
                    className={`material-symbols-outlined ${styles.downloadIcon}`}
                  >
                    shift
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>)
  );
};

export default SingleEmailPage;
