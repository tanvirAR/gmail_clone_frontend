import { useDispatch } from "react-redux";

import styles from "./EmailSendPopUpError.module.css";
import { ToggleEmailSendError } from "../../features/UI/UISlice";
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";

export const EmailSendPopUpError = () => {
  const dispath = useDispatch();

  // get the state which is the mail address of the reciever user is tryng to send, to show specific error

  const {sentAEmail, sentEmailErrorPopUpToggled} = useSelector(
    (state: storeStateInterface) => state.UI
  );

  const {to: receiverEmail} = sentAEmail;

  // close this error pop up handler function
  const closeErrorPopUp = () => {
    dispath(ToggleEmailSendError(false));
  };


  // render this component conditionally with global state 
  if (!sentEmailErrorPopUpToggled){
    return null
  }

  return (
    <div className={styles.sent_box}>
      <div className={styles.innerBox}>
        <div className={styles.headerContainer}>
          <p>Error</p>
          <div className={styles.icon} onClick={closeErrorPopUp}>
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>
        <div className={styles.mid}>
          {/* if reciptent email field is null show second paragrapgh or if reciptent email is invalid show first para  */}
          {receiverEmail !== "" ? (
            <p>
              The address &quot;{receiverEmail}&quot; in the
              &quot;To&quot; field was not recognized. Please make sure that all
              addresses are properly formed.
            </p>
          ) : (
            <p>Please specify at least one reciptent.</p>
          )}
        </div>
        <div className={styles.bottom}>
          <div className={styles.btn} onClick={closeErrorPopUp}>
            <p>OK</p>
          </div>
        </div>
      </div>
    </div>
  );
};
