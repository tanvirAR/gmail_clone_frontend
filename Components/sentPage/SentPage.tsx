import classes from "./SentPage.module.css"

import { useSelector } from "react-redux";
import TempSingleEmail from "../common/singlemail/SingleMail";
import Options from "../homePage/Options";

import storeStateInterface from "../../interface/Store.interface";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "../homePage/SingleEmail";
import { useGetSentMailsQuery } from "../../features/email/emailApi";


export default function SentPage() {

  const {onByToggle} =  useSelector((state: storeStateInterface) => state.UI.sidebarOn)

  const {data, isLoading, isError} = useGetSentMailsQuery();

   let emailList;
   // console.log(data?.mails);
   // console.log(error);

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
        <Options />

        {/* <EmailList /> */}
        <div className={classes.mailList}>
          {emailList}
          <TempSingleEmail />
          <TempSingleEmail />
          <TempSingleEmail />
          <TempSingleEmail />
        </div>
      </div>
    </div>
  );
}

