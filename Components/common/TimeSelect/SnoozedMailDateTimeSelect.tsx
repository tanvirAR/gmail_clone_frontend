import classes from "./SnoozedMailDateTimeSelect.module.css";
import { useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import storeInterface from "../../../interface/Store.interface";

import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment, { Moment } from "moment";
import { setSnoozedMailTimeComponent } from "../../../features/UI/UISlice";
import { useMarkMailAsSnoozedMutation } from "../../../features/snoozedMail/snoozedMailApi";

const SnoozedMailTimeSelect = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<string | null | undefined | Moment>(
    undefined
  );
  const myMoment = moment(date);
  const currentTime = moment();
const isValid = myMoment.valueOf() > currentTime.valueOf();
  // console.log(myMoment.toISOString());
  console.log(isValid)
const [markMailAsSnoozed, { data, error }] = useMarkMailAsSnoozedMutation();

if (data) {
  console.log(data)
}
if (error) {
  console.log(error)
}

  const { snoozedMailTimeSelectComponent, mailIdForMarkingSnoozed } = useSelector(
    (state: storeInterface) => state.UI
  );

  const closeAttachmentViewHandler = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    dispatch(setSnoozedMailTimeComponent(false))
  };
  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };


  
    const submitHandler = () => {
      if (isValid && mailIdForMarkingSnoozed) {
        markMailAsSnoozed({mailId: mailIdForMarkingSnoozed, time: myMoment.toISOString()})
        dispatch(setSnoozedMailTimeComponent(false))
      }
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
        <div onClick={submitHandler} className={`${classes.submit} ${isValid ? classes.validTime : ''}`}>
          <p>Select</p>
        </div>
      </div>
    </div>
  );
};

export default SnoozedMailTimeSelect;
