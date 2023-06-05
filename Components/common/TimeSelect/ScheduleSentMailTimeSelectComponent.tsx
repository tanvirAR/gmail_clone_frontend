import classes from "./ScheduleSentMailTimeSelectComponent.module.css";
import { useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import storeInterface from "../../../interface/Store.interface";

import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment, { Moment } from "moment";
import { useSendScheduledMailMutation } from "../../../features/scheduledMail/scheduledMailApi";
import { sendScheduledMailInterface } from "../../../interface/sendMailReqBody.interface";
import {
  clearEmailInputs,
  isSendingMailLoadingAction,
  isSendingMailLoadingVisible,
  setFirebaseUrl,
  setScheduledMailSentTimeSelectComponent,
} from "../../../features/UI/UISlice";

const SentScheduleSentTimeSelect = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<string | null | undefined | Moment>(
    undefined
  );
  const myMoment = moment(date);
  const currentTime = moment();
  const isValid = myMoment.valueOf() > currentTime.valueOf();
  console.log(myMoment.toISOString());

  const {
    scheduledSentTimeSelectComponent,
    attachmentFirebaseReturnedUrl,
    sentAEmail,
  } = useSelector((state: storeInterface) => state.UI);

  const { to, message, subject } = sentAEmail;

  const closeAttachmentViewHandler = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {};
  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const [sendScheduledMail, { data, isLoading, error, isError }] =
    useSendScheduledMailMutation();

  const sendMailHandler = () => {
    if (isValid) {
      const mailData: sendScheduledMailInterface = {
        email: to,
        message: message,
        subject: subject,
        time: myMoment.toISOString(),
        attachment: attachmentFirebaseReturnedUrl,
      };
      sendScheduledMail(mailData);

      // clear email inputs fields
      dispatch(clearEmailInputs());
      dispatch(setFirebaseUrl(""));

      // toggle custom toast
      dispatch(isSendingMailLoadingVisible(true));
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // check if request is sent and recived response or not to change the loading state in alertComponent
    if (data || isError) {
      if (data) {
        dispatch(isSendingMailLoadingAction("Sent!"));
        // hide this component after sending email & getting response
        dispatch(setScheduledMailSentTimeSelectComponent(false));
      }
      if (isError) {
        dispatch(
          isSendingMailLoadingAction("Failed to Send! Please try again.")
        );
        // hide this component after sending email & getting response
        dispatch(setScheduledMailSentTimeSelectComponent(false));
      }

      // execute the avove function to chage visiility (off) of email alert after 3s of receiving response
      setTimeout(function () {
        dispatch(isSendingMailLoadingVisible(false));
      }, 4000);
    }
  }, [dispatch, data, error, isError]);

  if (isLoading) {
    return null;
  }

  return (
    <div onClick={closeAttachmentViewHandler} className={classes.box}>
      <div onClick={handleDivClick} className={classes.innerBox}>
        <DateTime
          className={classes.calender}
          open
          input={false}
          timeFormat="HH:mm"
          dateFormat="DD/MM/YYYY"
          onChange={(date) => setDate(date)}
          isValidDate={(currentDate, selectedDate) =>
            currentDate.isSameOrAfter(moment())
          }
          renderYear={undefined}
        />
        <div
          onClick={sendMailHandler}
          className={`${classes.submit} ${isValid ? classes.validTime : ""}`}
        >
          <p>Select</p>
        </div>
      </div>
    </div>
  );
};

export default SentScheduleSentTimeSelect;
