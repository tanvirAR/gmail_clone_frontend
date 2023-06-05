import classes from "./EmailSendPopup.module.css";
import schedule_send_icon from "../../assets/schedule_send_icon.svg";
import open_in_full from "../../assets/open_in_full.svg";
import close_icon_2 from "../../assets/close_icon.svg";
import Image from "next/image";
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
} from "../../../features/UI/UISlice";
import React, { useState } from "react";
import storeStateInterface from "../../../interface/Store.interface";
import  SendEmailButton  from "../SendEmailButton/SendEmailButton";

function EmailSendPopup() {
  const [scheduleSend, setScheduleSend] = useState(false);

  const { sentAEmail, sentBoxSmallScreen } = useSelector((state: storeStateInterface) => state.UI);

  const dispatch = useDispatch();

  const closeSentMailBox = () => {
    dispatch(sentEmailBoxSmall(false));

    // clear written text input from fields
    dispatch(sentEmailTo(""));
    dispatch(sentAEmailSubject(""));
    dispatch(sentAEmailMessage(""));

    // if a file is attached to attachment , clear the name , type , size info
    dispatch(setAttachment(null));
  };

  const smallScreenToFullScreen = async () => {
    dispatch(sentEmailBoxSmall(false));

    dispatch(sentEmailBoxLarge(true));
  };

  const smallScreenToMinimize = async () => {
     dispatch(sentEmailBoxSmall(false));
    dispatch(sentEmailMinimizePopup(true));
  };

  if(!sentBoxSmallScreen){
    return null;
  }

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
         maxLength={2000}
          value={sentAEmail.message}
          onChange={(e) => dispatch(sentAEmailMessage(e.target.value))}
        ></textarea>
        <div>
          <Email_Attachment />
        </div>
      </div>
      <SendEmailButton />
    </div>
  );
}

export default React.memo(EmailSendPopup);
