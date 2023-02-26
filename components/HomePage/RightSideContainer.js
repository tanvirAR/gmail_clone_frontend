import Options from "./Options";
import EmailSection from "./EmailSection";
import styles from "./RightContainer.module.css";
import AllEmails from "./AllEmails";
import EmailSendPopup from "./EmailSendPopup";
import EmailSendPopupFullScreen from "./EmailSendPopupFullScreen";
import { useSelector } from "react-redux";
import MinimizedEmail from "./MinimizedEmail";

export default function RightContainer() {
  const { sentBoxSmallScreen, sentBoxLargeScreen } = useSelector(
    (state) => state.UI
  );

  return (
    <div style={{ borderRadius: "20px" }} className={styles["emailList"]}>
      <div>
        <Options />

        <EmailSection />
        {/* <AllEmails /> */}
        {sentBoxSmallScreen && <EmailSendPopup />}
        {/* <EmailSendPopupFullScreen /> */}
      </div>
      <div className={styles.minimizedEmailList}>
        <MinimizedEmail />
        {/* <MinimizedEmail />
        <MinimizedEmail />
        <MinimizedEmail /> */}
      </div>
    </div>
  );
}

