import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import classes from "./SendEmailButton.module.css";
import schedule_send_icon from "../../assets/schedule_send_icon.svg";
import { useSendMailMutation } from "../../../features/email/emailApi";
import { useSelector } from "react-redux";
import storeStateInterface from "../../../interface/Store.interface";
import validateEmail from "../../../utils/emailValidator";
import { useDispatch } from "react-redux";
import { clearEmailInputs, isSendingMailLoadingAction, isSendingMailLoadingVisible, sentEmailBoxLarge, sentEmailBoxSmall, setAttachment, setAttachmentUploadProgg, setFirebaseUrl, setScheduledMailSentTimeSelectComponent, ToggleEmailSendError } from "../../../features/UI/UISlice";
// utilities functions imports
import { fileToBase64, b64toBlob } from "../../../utils/fileToBase64";
import { setToLocStrg, getFrmLocStrg } from "../../../utils/set&getFileFromLocalStorage";
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import { deleteFile } from "../../../utils/deleteFileFromFirebase";
import ScheduleSendButton from "./ScheduleSendButton";

 const SendEmailButton = () => {
  const [scheduleSend, setScheduleSend] = useState(false);
  const dispatch = useDispatch();

  const [sendMail, { isError, isLoading, data, isSuccess }] =
    useSendMailMutation();

  const { sentAEmail, attachment, isSendingMailLoading, attachmentFirebaseReturnedUrl } = useSelector(
    (state: storeStateInterface) => state.UI
  );
  const { to, subject, message } = sentAEmail;

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
      attachment: attachmentFirebaseReturnedUrl ?? undefined,
    };

    // finally send the mail
    sendMail(data);
    // clear input field data from global state
    dispatch(clearEmailInputs());
    dispatch(setFirebaseUrl(""));
    // set the lading state for sending a mail to true (a custom toast)
    dispatch(isSendingMailLoadingAction(true));
    // set the visibility of the component ie (sendMailAlert) to true (a custom toast)
    dispatch(isSendingMailLoadingVisible(true));
  };


  // same as send mail handler but only checks input field error and redirect to (ScheduledSentMailTimeSelectComponent)  
  const sendScheduleMailHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
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
      dispatch(setScheduledMailSentTimeSelectComponent(true))
      dispatch(sentEmailBoxSmall(false));
      dispatch(sentEmailBoxLarge(false));
  };









  useEffect(() => {
    // check if request is sent and recived response or not to change the loading state in alertComponent
    if (data || isError) {
      dispatch(isSendingMailLoadingAction(false));
      // hide this component after sending email & getting response
      dispatch(sentEmailBoxSmall(false));
      dispatch(sentEmailBoxLarge(false));

      // execute the avove function to chage visiility (off) of email alert after 3s of receiving response
      setTimeout(function () {
        dispatch(isSendingMailLoadingVisible(false));
      }, 4000);
    }
  }, [isError, isSuccess, dispatch, data]);

  // ....................    attachment management  (start)     .............................
  // attachment file to handle file change
  const [file, setFile] = useState<null | File>(null);

  // (Handler) convert selected file as attachment to base64 & store in local Storage
  async function handleAttFileToB64(attFile: File) {
    const base64String = await fileToBase64(attFile);
    // set base64 data to local Storage
    await setToLocStrg(base64String);
  }

  // (Handler) get base64 data from Local Storage and convert back into a File object
  async function cycleHander() {
    const retreiveLocStrgData = await getFrmLocStrg();
    if (retreiveLocStrgData) {
      const fileName = attachment?.name || "ABC";
      const fileType = attachment?.type || "image/jpg";
      handleBase64Input(retreiveLocStrgData, fileName, fileType);
      console.log("Process is now runnig...");
    }
  }

  useEffect(() => {
    if (attachment?.name && attachment?.type && file == null) {
      cycleHander();
    }
  }, [attachment]);

  // convert base64 data to a FIle storage
  const handleBase64Input = async (
    rawBase64: string,
    name: string,
    type: string
  ) => {
    try {
      const fileBlob = await b64toBlob(rawBase64);
      const convertedFile = new File([fileBlob], name, {
        type: type,
      });
      setFile(convertedFile);
    } catch (error) {
      console.log(error);
    }
  };

  // attachment change handler
  const attachmentSelectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let tempFileName;
    if (file && attachment!==null) {
      tempFileName = file.name;
    }
    if (e.target.files && e.target.files[0]) {
      try {
        const image = e.target.files[0];
        // save the attachment file in the global state
        setFile(image);
        // store file in local storage as base64 data
        handleAttFileToB64(image);
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
  // ....................    attachment management  (end)     .............................

  // ......................  save file to fire storage (start) ................
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
          //  console.log(url)
          dispatch(setFirebaseUrl(url))
        );
      }
    );
  };


  // ......................  save file to fire storage (end) ................

  return (
    !isSendingMailLoading.isComponentVisible ? (
      <div className={classes.container}>
        <div className={classes.bottom_options}>
          <div onClick={sendMailHandler} className={classes.send_first_part}>
            {scheduleSend && (
              <div onClick={sendScheduleMailHandler} className={classes.schedule_send}>
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
          <span
            className={`material-symbols-outlined ${classes.attchmentIcon}`}
          >
            attach_file
          </span>
        </div>
      </div>
    ) : <></>
  );
};


export default SendEmailButton