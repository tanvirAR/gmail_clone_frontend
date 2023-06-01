import classes from "./ScheduledPage.module.css";

import { useSelector } from "react-redux";
import TempSingleEmail from "../common/singlemail/SingleMail";
import Options from "../common/EmailOptions/Options";

import storeStateInterface from "../../interface/Store.interface";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "../homePage/SingleEmail";
import { useRef } from "react";
import { scheduledType } from "../../interface/EmailType";
import { useGetAllScheduledMailsQuery } from "../../features/scheduledMail/scheduledMailApi";

export default function ScheduledPageComponent() {
  const { UI, additionalEmailData } = useSelector(
    (state: storeStateInterface) => state
  );
  const { onByToggle } = UI.sidebarOn;

  const refetchButtonRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    refetch: sentMailRefetch,
  } = useGetAllScheduledMailsQuery();

  let emailList;

  if (isError) {
    emailList = <p>Something went wrong! Please try again.</p>;
  }

  if (data) {
    emailList = data.mails.map((email: email) => (
      <SingleEmail
        pageType={scheduledType}
        buttonRef={refetchButtonRef}
        property={email}
        key={email.id}
      />
    ));
  }

  if (isLoading) {
    emailList = <p>Loading...</p>;
  }

  if (data && data.mails.length == 0) {
    emailList = <p>No Email found!</p>;
  }

  return (
    <div
      style={!onByToggle ? { marginLeft: "4.5rem" } : {}}
      className={classes.box}
    >
      <div>
        <Options
          refetch={sentMailRefetch}
          buttonRef={refetchButtonRef}
          pageType={scheduledType}
        />

        <div className={classes.mailList}>{emailList}</div>
      </div>
    </div>
  );
}
