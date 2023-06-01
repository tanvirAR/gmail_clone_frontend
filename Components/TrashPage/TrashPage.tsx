import classes from "./TrashPage.module.css";

import { useSelector } from "react-redux";
import Options from "../common/EmailOptions/Options";

import storeStateInterface from "../../interface/Store.interface";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "../homePage/SingleEmail";
import { useRef } from "react";
import { trashType } from "../../interface/EmailType";
import { useGetTrashMailsQuery } from "../../features/trashMail/trashMailApi";

export default function TrashPage() {
  const { UI } = useSelector((state: storeStateInterface) => state);
  const { onByToggle } = UI.sidebarOn;

  const refetchButtonRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    refetch: trashMailRefetch,
  } = useGetTrashMailsQuery();

  let emailList;

  if (isError) {
    emailList = <p>Something went wrong! Please try again.</p>;
  }

  if (data) {
    emailList = data.mails.map((email: email) => (
      <SingleEmail
        pageType={trashType}
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
          refetch={trashMailRefetch}
          buttonRef={refetchButtonRef}
          pageType={trashType}
        />

        <div className={classes.mailList}>{emailList}</div>
      </div>
    </div>
  );
}
