import Options from "./Options"
import EmailSection from "./EmailSection"
import styles from "../../../../../styles/inboxPage/RightContainer.module.css"
import AllEmails from "./AllEmails";
import EmailSendPopup  from "./EmailSendPopup";
import EmailSendPopupFullScreen from "./EmailSendPopupFullScreen";
import { useSelector } from "react-redux";
import MinimizedEmail from "./MinimizedEmail";
import { useRouter } from "next/router";


export default function RightContainer() {
const { sentBoxSmallScreen, sentBoxLargeScreen, minimizeEmailPop } =
  useSelector((state) => state.UI);

const router = useRouter()

  return (
    <div  style={{ borderRadius: "20px",  }} className={styles["emailList"]}>
      <div>
        <Options />

        <EmailSection />
        <AllEmails />
        {sentBoxSmallScreen && <EmailSendPopup />}
        {sentBoxLargeScreen && <EmailSendPopupFullScreen />}
      </div>
      <div className={styles.minimizedEmailList}>
        {minimizeEmailPop && <MinimizedEmail />}
        {/* <MinimizedEmail />
        <MinimizedEmail />
        <MinimizedEmail /> */}
      </div>
    </div>
  );
}

// style={{borderRadius: '10px',}}
// style={{ background: "white" }} 
