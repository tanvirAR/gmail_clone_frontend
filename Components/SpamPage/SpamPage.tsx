// import Options from "./Options";
import { useSelector } from "react-redux";
import TempSingleEmail from "../common/singlemail/SingleMail";
import Options from "../homePage/Options";
// import EmailList from "./EmailList"

import classes from "./SpamPage.module.css";
import storeStateInterface from "../../interface/Store.interface";
import { useGetSpamMailsQuery, useGetTrashMailsQuery } from "../../features/email/emailApi";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "../homePage/SingleEmail";



export default function SpamPage() {
  const { onByToggle } = useSelector(
    (state: storeStateInterface) => state.UI.sidebarOn
  );

  const { data, isLoading, isError } = useGetSpamMailsQuery()

  let emailList;

  if (isError) {
    emailList = <p>Error occured! Please try again.</p>;
  }

  if (data) {
    emailList = data.mails.map((email: email) => (
      <SingleEmail property={email} key={email.id} />
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
        {/* <Options  /> */}

        <div className={classes.mailList}>
          {emailList}
          {/* <TempSingleEmail />
          <TempSingleEmail />
          <TempSingleEmail />
          <TempSingleEmail /> */}
        </div>
      </div>
    </div>
  );
}
