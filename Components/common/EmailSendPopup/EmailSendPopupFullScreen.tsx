import classes from "./EmailSendPopupFullScreen.module.css";
import Image from "next/image";
// import classes from "../../../../../styles/inboxPage/EmailSendPopup.module.css";
import hideFullScreen from "../../assets/hide.svg";
import close_icon_2 from "../../assets/close_icon.svg";
import Email_Attachment from "../EmailAttachment/Email_Attachment";
import { useDispatch, useSelector } from "react-redux";
import {
  sentEmailMinimizePopup,
  sentEmailBoxLarge,
  sentEmailBoxSmall,
  // field input value from state redux container
  sentAEmailSubject,
  sentEmailTo,
  sentAEmailMessage,
  setFirebaseUrl,
  setAttachment,
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

function EmailSendPopupFullScreen(props: props) {
  const { attachmentFile, setAttachmentFile } = props;

  const { sentAEmail, attachment, attachmentUploadProgressBar } = useSelector(
    (state: storeStateInterface) => state.UI
  );

  const dispatch = useDispatch();

  const closeFullScreenPopup = () => {
    closeAttchmentHandler();
    dispatch(clearEmailInputs());

    dispatch(sentEmailBoxLarge(false));
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

  const minimizeFullScreenPopup = () => {
    dispatch(sentEmailBoxLarge(false));
    dispatch(sentEmailMinimizePopup(true));
  };

  const fullScreenToSmallScreenPopup = () => {
    dispatch(sentEmailBoxLarge(false));
    dispatch(sentEmailBoxSmall(true));
  };

  return (
    <div className={classes.sent_box}>
      <div className={classes.innerBox}>
        <div className={classes.first_column}>
          <p>New Message</p>
          <div className={classes.close_minimize_options}>
            <span
              onClick={minimizeFullScreenPopup}
              className={`material-icons ${classes.minimize}`}
            >
              minimize
            </span>
            <span
              onClick={fullScreenToSmallScreenPopup}
              className={`material-symbols-outlined ${classes.open_in_full}`}
            >
              close_fullscreen
            </span>
            <span
              onClick={closeFullScreenPopup}
              className={`material-symbols-outlined ${classes.close_icon_2}`}
            >
              close
            </span>
          </div>
        </div>

        <div className={classes.second_column}>
          <p>To</p>
          <input
            value={sentAEmail.to}
            onChange={(e) => dispatch(sentEmailTo(e.target.value))}
            type="text"
          />
        </div>

        <div className={classes.br}></div>
        <div className={classes.third_column}>
          {/* <p>Subject</p> */}
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
            value={sentAEmail.message}
            placeholder="Message"
            onChange={(e) => dispatch(sentAEmailMessage(e.target.value))}
          ></textarea>
          <div>
            <Email_Attachment closeAttachmentHandler={closeAttchmentHandler} />
          </div>
        </div>
        <SendEmailButton file={attachmentFile} setFile={setAttachmentFile} />
      </div>
    </div>
  );
}

export default React.memo(EmailSendPopupFullScreen);
