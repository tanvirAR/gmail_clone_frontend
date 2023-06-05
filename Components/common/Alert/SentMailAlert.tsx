import { useSelector } from "react-redux";
import storeStateInterface from "../../../interface/Store.interface";
import styles from "./SentMailAlert.module.css";

 const SentMailAlert = () => {
  const { message } = useSelector(
    (state: storeStateInterface) => state.UI.isSendingMailLoading
  );

const errorClass = message == "Failed to Send! Please try again." ? styles.error : ''

  return (
    <div className={`${styles.emailSentAlert} ${errorClass}`}>
      <p>{message}</p>
    </div>
  );
};


export default SentMailAlert;