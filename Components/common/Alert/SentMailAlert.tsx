import { useSelector } from "react-redux";
import storeStateInterface from "../../../interface/Store.interface";
import styles from "./SentMailAlert.module.css";

 const SentMailAlert = () => {
  const { isLoading } = useSelector(
    (state: storeStateInterface) => state.UI.isSendingMailLoading
  );



  return (
    <div className={styles.emailSentAlert}>
      <p>{isLoading ? "Sending..." : "sent!"}</p>
    </div>
  );
};


export default SentMailAlert;