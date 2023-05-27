import classes from "./SearchPage.module.css"


import { useSelector } from "react-redux";
import Options from "../homePage/Options";

import storeStateInterface from "../../interface/Store.interface";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "../homePage/SingleEmail";
import { useEffect, useRef, useState } from "react";
import { sentType } from "../../interface/EmailType";
import { useGetSentMailsQuery } from "../../features/sentMail/sentMailApi";
import { emailSearchQuery } from "../../interface/emailSearchQuery.interace";
import { useSearchEmailQuery } from "../../features/search/searchMailApi";

interface props {
  searchedQuery: string | undefined
}

export default function SearchPage(props: props) {
  const { searchedQuery } = props;
  const [queryLoaded, setQueryLoaded] = useState(false);

  const { UI } = useSelector((state: storeStateInterface) => state);
  const { onByToggle } = UI.sidebarOn;

  useEffect(() => {
    if (searchedQuery) {
      setQueryLoaded(true)
    }
  }, [searchedQuery])
  
  const refetchButtonRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    refetch: sentMailRefetch,
  } = useSearchEmailQuery(searchedQuery || '', {
    skip: !queryLoaded
  })

  let emailList;

  if (isError) {
    emailList = <p>Something went wrong! Please try again.</p>;
  }

  if (data) {
    console.log(data)
    emailList = data.mails.map((email: email) => (
      <SingleEmail
        pageType={sentType}
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
      {/* <div>
        <Options
          refetch={sentMailRefetch}
          buttonRef={refetchButtonRef}
          pageType={sentType}
        />

        <div className={classes.mailList}>{emailList}</div>
      </div> */}
    </div>
  );
}
