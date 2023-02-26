import classes from "../../../../../styles/inboxPage/EmailSendPopupFullScreen.module.css";
import Image from "next/image";
// import classes from "../../../../../styles/inboxPage/EmailSendPopup.module.css";
import schedule_send_icon from "../../../../../assets/schedule_send_icon.svg";
import hideFullScreen from "../../../../../assets/hide.svg";
import close_icon_2 from "../../../../../assets/close_icon.svg";
import Email_Attachment from "./Email_Attachment";
import { useDispatch, useSelector } from "react-redux";
import {
  sentEmailMinimizePopup,
  sentEmailBoxLarge,
  sentEmailBoxSmall,
  // firld input value from state redux container
  sentAEmailSubject,
  sentEmailTo,
  sentAEmailMessage,
} from "../../../../../features/UI/UISlice";
import React, { useState } from "react";

export default function EmailSendPopupFullScreen() {
  const [scheduleSend, setScheduleSend] = useState(false);

  const { sentAEmail } = useSelector((state) => state.UI);

  const dispatch = useDispatch();

  const closeFullScreenPopup = () => {
    dispatch(sentEmailBoxLarge(false));

    // clear written text input from fields
    dispatch(sentEmailTo(""));
    dispatch(sentAEmailSubject(""));
    dispatch(sentAEmailMessage(""));
  };

  const minimizeFullScreenPopup = async () => {
    dispatch(sentEmailBoxLarge(false));
    dispatch(sentEmailMinimizePopup(true));
  };

  const fullScreenToSmallScreenPopup = async () => {
    await dispatch(sentEmailBoxLarge(false));
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
            <Image
              onClick={fullScreenToSmallScreenPopup}
              className={classes.open_in_full}
              src={hideFullScreen}
              alt=""
            />
            <Image
              onClick={closeFullScreenPopup}
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
    </div>
  );
}
