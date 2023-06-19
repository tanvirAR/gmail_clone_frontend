import classes from "./EmailSendPopup.module.css";
import Email_Attachment from "../EmailAttachment/Email_Attachment";
import { useDispatch, useSelector } from "react-redux";
import {
  sentEmailBoxSmall,
  sentEmailMinimizePopup,
  sentEmailBoxLarge,
  sentAEmailSubject,
  sentEmailTo,
  sentAEmailMessage,
  setAttachment,
  setFirebaseUrl,
  clearEmailInputs,
} from "../../../features/UI/UISlice";
import React from "react";
import storeStateInterface from "../../../interface/Store.interface";
import SendEmailButton from "../SendEmailButton/SendEmailButton";
import { deleteFile } from "../../../utils/deleteFileFromFirebase";

interface props {
  attachmentFile: any;
  setAttachmentFile: any;
}

function EmailSendPopup(props: props) {
  const { attachmentFile, setAttachmentFile } = props;
  const { sentAEmail, attachment, attachmentUploadProgressBar } = useSelector(
    (state: storeStateInterface) => state.UI
  );

  const dispatch = useDispatch();

  const closeSentMailBox = () => {
    closeAttchmentHandler();
    dispatch(clearEmailInputs());

    dispatch(sentEmailBoxSmall(false));
  };

  const closeAttchmentHandler = () => {
    if (attachment?.name) {
      if (
        attachmentUploadProgressBar > 0 &&
        attachmentUploadProgressBar < 100
      ) {
        dispatch(setAttachment(null));
        setAttachmentFile(null);
      } else {
        // delete file from firebase
        deleteFile(attachment?.name);
      }
      dispatch(setAttachment(null));
      setAttachmentFile(null);
      setFirebaseUrl("");
    }
  };

  const smallScreenToFullScreen = () => {
    dispatch(sentEmailBoxLarge(true));
    dispatch(sentEmailBoxSmall(false));
  };

  const smallScreenToMinimize = () => {
    dispatch(sentEmailMinimizePopup(true));
    dispatch(sentEmailBoxSmall(false));
  };

  return (
    <div className={classes.sent_box}>
      <div className={classes.first_column}>
        <p>New Message</p>
        <div className={classes.close_minimize_options}>
          <span
            onClick={smallScreenToMinimize}
            className={`material-icons ${classes.minimize}`}
          >
            minimize
          </span>
          <span
            onClick={smallScreenToFullScreen}
            className={`material-symbols-outlined ${classes.open_in_full}`}
          >
            close_fullscreen
          </span>
          <span
            onClick={closeSentMailBox}
            className={`material-symbols-outlined ${classes.close_icon_2}`}
          >
            close
          </span>
        </div>
      </div>

      <div className={classes.second_column}>
        <p>To</p>
        <input
          autoComplete="on"
          value={sentAEmail.to}
          onChange={(e) => dispatch(sentEmailTo(e.target.value))}
          type="text"
        />
      </div>
      <div className={classes.br}></div>
      <div className={classes.third_column}>
        <input
          value={sentAEmail.subject}
          onChange={(e) => dispatch(sentAEmailSubject(e.target.value))}
          type="text"
          placeholder="Subject"
        />
      </div>
      <div className={classes.br}></div>

      <div className={classes.fourth_column}>
        <textarea
          maxLength={2000}
          placeholder="Message"
          value={sentAEmail.message}
          onChange={(e) => dispatch(sentAEmailMessage(e.target.value))}
        ></textarea>
        <div>
          <Email_Attachment
            closeAttachmentHandler={closeAttchmentHandler}
          />
        </div>
      </div>
      <SendEmailButton file={attachmentFile} setFile={setAttachmentFile} />
    </div>
  );
}

export default React.memo(EmailSendPopup);
