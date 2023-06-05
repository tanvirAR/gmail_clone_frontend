import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./SearchPage.module.css";

import Options from "../common/EmailOptions/Options";
import storeStateInterface from "../../interface/Store.interface";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "../homePage/SingleEmail";
import { searchedEmailType } from "../../interface/EmailType";
import { useSearchEmailQuery } from "../../features/search/searchMailApi";
import Head from "next/head";

interface props {
  searchedQuery: string | undefined;
}

export default function SearchPage(props: props) {
  const { searchedQuery } = props;
  const [queryLoaded, setQueryLoaded] = useState(false);

  const { UI, auth } = useSelector((state: storeStateInterface) => state);
  const { onByToggle } = UI.sidebarOn;

  useEffect(() => {
    if (searchedQuery) {
      setQueryLoaded(true);
    }
  }, [searchedQuery]);

  const refetchButtonRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    refetch: sentMailRefetch,
  } = useSearchEmailQuery(searchedQuery || "", {
    skip: !queryLoaded,
  });

  let emailList;

  if (isError) {
    emailList = <p>Something went wrong! Please try again.</p>;
  }

  if (data) {
    emailList = data.mails.map((email: email) => (
      <SingleEmail
        pageType={searchedEmailType}
        buttonRef={refetchButtonRef}
        property={email}
        key={email.id}
        // pass the query to each email to navigate whenn clicked on a single email from searched result
        searchedMailQuery={searchedQuery}
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
    <>
      <Head>
        <title>Search results - {auth?.user?.email}</title>
      </Head>
      <div
        style={!onByToggle ? { marginLeft: "4.5rem" } : {}}
        className={classes.box}
      >
        <div>
          <Options
            refetch={sentMailRefetch}
            buttonRef={refetchButtonRef}
            pageType={searchedEmailType}
          />

          <div className={classes.mailList}>{emailList}</div>
        </div>
      </div>
    </>
  );
}
