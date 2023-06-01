import classes from "./ImportantPage.module.css";

import { useSelector } from "react-redux";
import TempSingleEmail from "../common/singlemail/SingleMail";
import Options from "../common/EmailOptions/Options";

import storeStateInterface from "../../interface/Store.interface";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "../homePage/SingleEmail";
import { useGetStarredMailsQuery } from "../../features/starredEmail/starredEmailApi";
import { useRef } from "react";
import { importantType } from "../../interface/EmailType";
import { useGetImportantMailsQuery } from "../../features/importantEmail/importantEmailApi";

export default function ImportantMailPage() {
  const { UI, additionalEmailData } = useSelector(
    (state: storeStateInterface) => state
  );
  const { onByToggle } = UI.sidebarOn;

  const refetchButtonRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    refetch: importantMailRefetch,
  } = useGetImportantMailsQuery();

  let emailList;


  if (isError) {
    emailList = <p>Something went wrong! Please try again.</p>;
  }

  if (data) {
    emailList = data.mails.map((email: email) => (
      <SingleEmail
        pageType={importantType}
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
          refetch={importantMailRefetch}
          buttonRef={refetchButtonRef}
          pageType={importantType}
        />
        <div className={classes.mailList}>
          {emailList}
        </div>
      </div>
    </div>
  );
}
