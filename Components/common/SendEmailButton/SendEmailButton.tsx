import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import classes from "./SendEmailButton.module.css";
import { useSendMailMutation } from "../../../features/email/emailApi";
import { useSelector } from "react-redux";
import storeStateInterface from "../../../interface/Store.interface";
import validateEmail from "../../../utils/emailValidator";
import { useDispatch } from "react-redux";
import {
  clearEmailInputs,
  isSendingMailLoadingAction,
  isSendingMailLoadingVisible,
  sentEmailBoxLarge,
  sentEmailBoxSmall,
  setAttachment,
  setAttachmentUploadProgg,
  setFirebaseUrl,
  setScheduledMailSentTimeSelectComponent,
  ToggleEmailSendError,
} from "../../../features/UI/UISlice";

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import { deleteFile } from "../../../utils/deleteFileFromFirebase";
import ScheduleSendButton from "./ScheduleSendButton";

interface props {
  file: any;
  setFile: any;
}

const SendEmailButton = (props: props) => {
  const [scheduleSend, setScheduleSend] = useState(false);
  const dispatch = useDispatch();

  const {
    sentAEmail,
    attachment,
    isSendingMailLoading,
    attachmentFirebaseReturnedUrl,
  } = useSelector((state: storeStateInterface) => state.UI);

  const { to, subject, message } = sentAEmail;

  const [sendMail, { isError, isLoading, data, isSuccess }] =
    useSendMailMutation();

  const sendMailHandler = () => {
    // check if receiver email is valid
    const isValid = validateEmail(to);

    // if the both subject and message field empty, warn the user before sending the mail
    if (subject == "" && message == "") {
      const confirmation = confirm(
        "Send this message without a subject or text in the body?"
      );
      if (confirmation == false) {
        console.log("Not send");
        return;
      }
    }
    if (isValid == null) {
      dispatch(ToggleEmailSendError(true));
      return;
    }
    const data = {
      email: to,
      subject,
      message,
      attachment: attachmentFirebaseReturnedUrl && file ? attachmentFirebaseReturnedUrl : undefined,
    };

    // finally send the mail
    sendMail(data);
    
    // clear input field data from global state
    dispatch(clearEmailInputs());
    dispatch(setFirebaseUrl(""));
    dispatch(setAttachment(undefined))


    // set the visibility of the component ie (sendMailAlert) to true (a custom toast)
    dispatch(isSendingMailLoadingVisible(true));
  };

  const { file, setFile } = props;

  // attachment change handler
  const attachmentSelectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let tempFileName;
    if (file && attachment !== null) {
      tempFileName = file.name;
    }
    const selectedFile = e.target.files
    if (selectedFile && selectedFile[0]) {
      try {
        const image = selectedFile[0];
        // save the attachment file in the local state
        setFile(image);

        dispatch(
          setAttachment({
            name: image.name,
            type: image.type,
            size: image.size,
          })
        );

        uploadFiles(image);

        if (tempFileName) {
          deleteFile(tempFileName);
        }
      } catch (error) {
        alert("Failed to attach file. Please try again!");
      }
    }
  };

  const uploadFiles = (file: File) => {
    const storageRef = ref(storage, `gmailClone/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        dispatch(setAttachmentUploadProgg(prog));
      },
      (err) => console.log(`Error Occured Uploading: ${err}`),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          dispatch(setFirebaseUrl(url))
        );
      }
    );
  };






  useEffect(() => {
    // check if request is sent and recived response or not to change the loading state in alertComponent
    if (data || isError) {
      if (data) {
        dispatch(isSendingMailLoadingAction("Sent!"));
      }
      if (isError) {
        dispatch(
          isSendingMailLoadingAction("Failed to Send! Please try again.")
        );
      }
      // hide this component after sending email & getting response
      dispatch(sentEmailBoxSmall(false));
      dispatch(sentEmailBoxLarge(false));

      // execute the avove function to chage visiblity (off) of email alert after 3s of receiving response
      setTimeout(function () {
        dispatch(isSendingMailLoadingVisible(false));
      }, 4000);
    }
  }, [isError, isSuccess, dispatch, data]);






  // same as send mail handler but only checks input field error and redirect to (ScheduledSentMailTimeSelectComponent)
  const sendScheduleMailHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // check if receiver email is valid
    const isValid = validateEmail(to);

    // if the both subject and message field empty, warn the user before sending the mail
    if (subject == "" && message == "") {
      const confirmation = confirm(
        "Send this message without a subject or text in the body?"
      );
      if (confirmation == false) {
        console.log("Not send");
        return;
      }
    }
    if (isValid == null) {
      dispatch(ToggleEmailSendError(true));
      return;
    }
    dispatch(setScheduledMailSentTimeSelectComponent(true));
    dispatch(sentEmailBoxSmall(false));
    dispatch(sentEmailBoxLarge(false));
  };

  return !isSendingMailLoading.isComponentVisible ? (
    <div className={classes.container}>
      <div className={classes.bottom_options}>
        <div onClick={sendMailHandler} className={classes.send_first_part}>
          {scheduleSend && (
            <div
              onClick={sendScheduleMailHandler}
              className={classes.schedule_send}
            >
              <ScheduleSendButton />
            </div>
          )}
          <p>Send</p>
        </div>
        <div className={classes.send_second_part}>
          <button
            onClick={() => setScheduleSend((prevState) => !prevState)}
            // onBlur={() => setScheduleSend(false)}
            className={classes.send_option_button}
          >
            {scheduleSend && (
              <span className={"material-icons"}>arrow_drop_up</span>
            )}
            {!scheduleSend && (
              <span className={"material-icons"}>arrow_drop_down</span>
            )}
          </button>
        </div>
      </div>
      <div
        className={classes.attachmentButton}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <input
          id="fileInput"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={attachmentSelectHandler}
          
        />
        <span className={`material-symbols-outlined ${classes.attchmentIcon}`}>
          attach_file
        </span>
      </div>
    </div>
  ) : null;
};

export default SendEmailButton;
