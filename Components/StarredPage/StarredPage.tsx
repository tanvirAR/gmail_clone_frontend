import classes from "./StarredPage.module.css";
import { useSelector } from "react-redux";
import Options from "../homePage/Options";
import storeStateInterface from "../../interface/Store.interface";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "../homePage/SingleEmail";
import { useGetStarredMailsQuery } from "../../features/starredEmail/starredEmailApi";
import { useRef } from "react";
import { starredType } from "../../interface/EmailType";

export default function StarredPage() {
  const { UI } = useSelector((state: storeStateInterface) => state);
  const { onByToggle } = UI.sidebarOn;

  const refetchButtonRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    refetch: starredMailRefetch,
  } = useGetStarredMailsQuery();

  let emailList;

  if (isError) {
    emailList = <p>Something went wrong! Please try again.</p>;
  }

  if (data) {
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
  }

  return (
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
  );
}
