import Image from "next/image";
import important_logo1 from "../../../../../assets/label_important_FILL1_wght100_GRAD-25_opsz48.svg"
import important_logo2 from '../../../../../assets/label_important.svg'
import deleteEmail_logo from "../../../../../assets/deleteSingleEmail.svg"
import unread_logo from "../../../../../assets/emailUnread.svg";
import read_logo from "../../../../../assets/emailRead.svg";
import snooze_logo from "../../../../../assets/snooze.svg";
import styles from "../../../../../styles/inboxPage/SingleEmail.module.css"



export default function SingleEmail() {
  return (
    <div className={styles["email_row"]}>
      <div className={styles["emailRow_options"]}>
        <input type="checkbox" />
        <span style={{ color: "#c7c9c8" }} className="material-icons">
          star_border{" "}
        </span>
        <span style={{ color: "red" }} className="material-icons">
          {" "}
          label_important{" "}
        </span>

        {/* <span className="material-icons"> label_important </span> */}
        {/* <Image className="abcd" src={important_logo1} alt="" /> */}
        {/* <Image className={styles.abcd} src={important_logo2} alt="" /> */}
      </div>
      <h3 className={styles["emailRow_title"]}>Youtube</h3>
      <div className={styles["emailRow_message"]}>
        <h4>
          You got a new Subscriber
          <span className={styles["emailRow_description"]}>
            -on Your channel Mr Beast
          </span>
        </h4>
      </div>
      {/* <p className={styles["emailRow_time"]}>10:00 pm</p> */}
      <div className={styles["singleEmail_left"]}>
        <Image src={deleteEmail_logo} alt="" />
        {/* <Image className={styles["unread"]} src={unread_logo} alt="" /> */}
        <Image className={styles["unread"]} src={read_logo} alt="" />

        <Image src={snooze_logo} alt="" />
      </div>
    </div>
  );
}



//  #f2f6fc