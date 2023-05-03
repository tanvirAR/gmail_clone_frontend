import moment from "moment";
import {
  useGetAdditionalSingleMailPropertyQuery,
  useGetSingleMailQuery,
  useMarkMailAsStarredQuery,
} from "../../features/email/emailApi";
import UserIcon from "../common/UserIcon";
import EmailOptions from "./EmailOptions";
import styles from "./SingleEmailPage.module.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setAttachmentView } from "../../features/UI/UISlice";
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

interface prop {
  emailId: string | undefined;
}

const SingleEmailPage = (prop: prop) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const mailId = prop.emailId;
  const [idLoaded, setIdLoaded] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mailMessage, setMailMessage] = useState("");

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

  // use to control auto rtk query fetch  and send request to mark mail as starred on user interaction
  const [markStarred, setMarkStarred] = useState(false);
  // mark mail as starred or unstarred query 
  const { refetch: starrredRefetch, isLoading: starredLoading } =
    useMarkMailAsStarredQuery(mailId || '', {
      skip: !markStarred || !idLoaded,
    });


      const markMailAsStarredHandler = () => {
        // tell the rtk quey to send request by disabling skip option
        if (!starredLoading) {
          if (!markStarred) {
            setMarkStarred(true);
          } else {
            // refetch use to sent request multiple times after user click 
            starrredRefetch();
          }
        }
      };

  const { data: additiionalEmailData } =
    useGetAdditionalSingleMailPropertyQuery(mailId || "", {
      skip: !idLoaded,
    });

  const { mail: additionalData } = additiionalEmailData || {};
  const { important, starred, read } = additionalData || {};

  const { onByToggle } = useSelector(
    (state: storeStateInterface) => state.UI.sidebarOn
  );

  const { data, isError, isLoading, isSuccess } = useGetSingleMailQuery(
    mailId || "",
    {
      skip: !idLoaded,
    }
  );

  const { mail } = data || {};
  const { senderName, senderEmail, subject, createdAt, message, attachment } =
    mail || {};

  const viewAttachmentFullScreenHandler = () => {
    dispatch(setAttachmentView({ isVisible: true, url: attachment }));
  };

  useEffect(() => {
    if (message) {
      setMailMessage(message);
    }
  }, [message]);

  return (
    <>
      <div
        style={!onByToggle ? { marginLeft: "4.5rem" } : {}}
        className={styles.container}
      >
        <EmailOptions mailId={mailId} />

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
              {/* <p>Mar 11, 2023, 10:27PM (5 days ago)</p> */}
              <b>
                <p>{moment(createdAt).format("MMMM D YYYY, h:mm A")}</p>
              </b>
            </div>
            <span onClick={markMailAsStarredHandler} className="material-symbols-outlined">star</span>
            <span
              onClick={() => router.push("/mail/u/1/inbox")}
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
                  <p>ABCDEFGHssssssssssssssss</p>
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
    </>
  );
};

export default SingleEmailPage;
