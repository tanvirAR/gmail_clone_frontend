import classes from "../../../../../styles/inboxPage/EmailSendPopup.module.css";
import schedule_send_icon from "../../../../../assets/schedule_send_icon.svg";
import open_in_full from "../../../../../assets/open_in_full.svg";
import close_icon_2 from "../../../../../assets/close_icon.svg";
import Image from "next/image";
import Email_Attachment from "./Email_Attachment";
import { useDispatch, useSelector } from "react-redux";
import {
  sentEmailBoxSmall,
  sentEmailMinimizePopup,
  sentEmailBoxLarge,
  sentAEmailSubject,
  sentEmailTo,
  sentAEmailMessage,
} from "../../../../../features/UI/UISlice";
import React, { useState } from "react";

function EmailSendPopup() {
const [scheduleSend, setScheduleSend] = useState(false)

const { sentAEmail } = useSelector((state) => state.UI);

const dispatch = useDispatch()

const closeSentMailBox = () => {
  dispatch(sentEmailBoxSmall(false))

  // clear written text input from fields
  dispatch(sentEmailTo(''));
  dispatch(sentAEmailSubject(''));
  dispatch(sentAEmailMessage(''));
}

  const smallScreenToFullScreen = async() => {
  await  dispatch(sentEmailBoxSmall(false))

    dispatch(sentEmailBoxLarge(true));
  };

  const smallScreenToMinimize = async() => {
    await dispatch(sentEmailBoxSmall(false));
    dispatch(sentEmailMinimizePopup(true));
  }

  console.log(sentAEmail.to)
  console.log(sentAEmail.subject);
  console.log(sentAEmail.message);



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
          <Image
            onClick={smallScreenToFullScreen}
            className={classes.open_in_full}
            src={open_in_full}
            alt=""
          />
          <Image
            onClick={closeSentMailBox}
            className={classes.close_icon_2}
            src={close_icon_2}
            alt=""
          />
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
          onChange={(e) => dispatch(sentAEmailMessage(e.target.value))}
        ></textarea>
        <div>
          <Email_Attachment />
          <Email_Attachment />
          <Email_Attachment />
        </div>
      </div>

      <div className={classes.bottom_options}>
        <div className={classes.send_first_part}>
          {scheduleSend && (
            <div className={classes.schedule_send}>
              <Image
                className={classes.schedule_send_icon}
                src={schedule_send_icon}
                alt=""
              />
              <p onClick={() => console.log("hhhhh")}>Schedule send</p>
            </div>
          )}
          <p>Send</p>
        </div>
        <div className={classes.send_second_part}>
          <button
            onClick={() => setScheduleSend((prevState) => !prevState)}
            onBlur={() => setScheduleSend(false)}
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
    </div>
  );
}

export default React.memo(EmailSendPopup);
