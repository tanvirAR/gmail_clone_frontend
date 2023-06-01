import Options from "../common/EmailOptions/Options";
import EmailSection from "../common/EmailSection/EmailSection";
import styles from "./InboxEmails.module.css";
import EmailList from "./EmailList";
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";
import { useGetAllMailsQuery } from "../../features/email/emailApi";
import SingleEmail from "./SingleEmail";
import { email } from "../../interface/singleMail.interface";
import { useRef } from "react";
import { inboxType } from "../../interface/EmailType";

export default function RightContainer() {
  const { sidebarOn } = useSelector((state: storeStateInterface) => state.UI);

  /* this ref is used to make a dynamic click event to refetch additionalEmailData, the refetch function for that is in SingleEmail Component  */
  const buttonRefForRefetchingAdditionalSingleEmailData = useRef(null);

  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,

    /* refetch function is passed down to Options component to refetch all emails on a page when user click refetch */
    refetch: emailsRefetch,
  } = useGetAllMailsQuery(inboxType);

  let emailList;

  if (isError) {
    emailList = <p>Error occured! Please try again.</p>;
  }

  if (data) {
    emailList = data.mails.map((email: email) => (
      <SingleEmail
        property={email}
        key={email.id}
        buttonRef={buttonRefForRefetchingAdditionalSingleEmailData}
        pageType={inboxType}
      />
    ));
  }

  if (isLoading || isFetching) {
    emailList = <p>Loading...</p>;
  }

  if (data && data.mails.length == 0) {
    emailList = <p>No Email found!</p>;
  }

  return (
    <div
      style={!sidebarOn.onByToggle ? { marginLeft: "4.5rem" } : {}}
      className={styles["emailList"]}
    >
      <div>
        <Options
          refetch={emailsRefetch}
          buttonRef={buttonRefForRefetchingAdditionalSingleEmailData}
          pageType={inboxType}
        />

        <EmailSection />
        <EmailList emailList={emailList} />
      </div>
    </div>
  );
}
