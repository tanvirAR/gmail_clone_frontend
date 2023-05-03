import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";
import styles from "./SentMailAlert.module.css";

export const SentMailAlert = () => {
  const { isLoading, isComponentVisible } = useSelector(
    (state: storeStateInterface) => state.UI.isSendingMailLoading
  );

  if (!isComponentVisible) {
    return null;
  }

  return (
    <div className={styles.emailSentAlert}>
      <p>{isLoading ? "Sending..." : "sent!"}</p>
    </div>
  );
};
