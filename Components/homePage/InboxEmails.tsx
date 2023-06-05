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
import Head from "next/head";

export default function RightContainer() {
  const { UI, auth } = useSelector((state: storeStateInterface) => state);
  const { sidebarOn } = UI;

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
  } = useGetAllMailsQuery();

  let emailList;
  let numberOfMails;

  if (isError) {
    emailList = <p>Something went wrong! Please try again.</p>;
  }

  if (data) {
    numberOfMails = data.mails.length;
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
     numberOfMails = 0;
  }

  const headerTitle =
    numberOfMails === 0
      ? " - "
      : numberOfMails
      ? `(${numberOfMails}) - `
      : "(error) ";

  return (
    <>
      <Head>
        <title>
          Inbox {headerTitle}
          {auth?.user?.email}
        </title>
      </Head>
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
    </>
  );
}
