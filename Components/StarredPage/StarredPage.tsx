import classes from "./StarredPage.module.css";
import { useSelector } from "react-redux";
import Options from "../common/EmailOptions/Options";
import storeStateInterface from "../../interface/Store.interface";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "../homePage/SingleEmail";
import { useGetStarredMailsQuery } from "../../features/starredEmail/starredEmailApi";
import { useRef } from "react";
import { starredType } from "../../interface/EmailType";
import Head from "next/head";

export default function StarredPage() {
  const { UI, auth } = useSelector((state: storeStateInterface) => state);
  const { onByToggle } = UI.sidebarOn;

  const refetchButtonRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    refetch: starredMailRefetch,
  } = useGetStarredMailsQuery();

  let emailList;
  let numberOfMails;

  if (isError) {
    emailList = <p>Something went wrong! Please try again.</p>;
  }

  if (data) {
    numberOfMails = data.mails.length;
    emailList = data.mails.map((email: email) => (
      <SingleEmail
        pageType={starredType}
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
          Starred {headerTitle}
          {auth?.user?.email}
        </title>
      </Head>
      <div
        style={!onByToggle ? { marginLeft: "4.5rem" } : {}}
        className={classes.box}
      >
        <div>
          <Options
            refetch={starredMailRefetch}
            buttonRef={refetchButtonRef}
            pageType={starredType}
          />

          <div className={classes.mailList}>{emailList}</div>
        </div>
      </div>
    </>
  );
}
