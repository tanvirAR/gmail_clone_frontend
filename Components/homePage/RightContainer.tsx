import Options from "./Options";
import EmailSection from "./EmailSection";
import styles from "./RightContainer.module.css";
import EmailList from "./EmailList";
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";
import { useGetAllMailsQuery } from "../../features/email/emailApi";
import SingleEmail from "./SingleEmail";
import { email } from "../../interface/singleMail.interface";
import { useRef } from "react";

export default function RightContainer() {
  const { sidebarOn } = useSelector((state: storeStateInterface) => state.UI);
  const buttonRef = useRef(null);
  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    refetch: emailsRefetch,
  } = useGetAllMailsQuery();

  let emailList;

  if (isError) {
    emailList = <p>Error occured! Please try again.</p>;
  }

  if (data) {
    emailList = data.mails.map((email: email) => (
      <SingleEmail property={email} key={email.id} buttonRef={buttonRef} />
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
        <Options refetch={emailsRefetch} buttonRef={buttonRef} />

        <EmailSection />
        <EmailList emailList={emailList} />
        {/* {emailList} */}
      </div>
    </div>
  );
}
