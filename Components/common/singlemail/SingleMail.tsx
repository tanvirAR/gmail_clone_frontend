import styles from "./SingleMail.module.css"


export default function TempSingleEmail() {
 

  return (
    <div className={styles["email_row"]}>
      <div className={styles["emailRow_options"]}>
        <input type="checkbox" id={styles.myCheckBox} />
        <span className="material-symbols-outlined">star</span>
        <span style={{ color: "red" }} className="material-icons">
          label_important
        </span>
      </div>

      <h3 className={styles["emailRow_title"]}>Nicola Tesla</h3>

      <div className={styles["emailRow_message"]}>
        <h4>
          Invitation for the Party
          <span className={styles["emailRow_description"]}>
            Jack, Did you know you can convert your 401K/IRA into real estate
            without penalties? Most investors are sick and tired of the ups and
            downs of the stock market and want their retirement accounts backed
            by REAL assets. In real estate, the main benefit that these
            investors are looking for is Cash Flow, but as you wait you are also
            getting the Appreciation, the Tax Benefits, and the Leverage used to
            buy a larger property with the down payment.
          </span>
        </h4>
      </div>

      <div className={styles.leftDiv}>
        <div className={styles.icons}>
          <div className={styles.leftIcon}>
            <span className="material-symbols-outlined">delete</span>
          </div>
          <div className={styles.leftIcon}>
            <span className="material-symbols-outlined">mail</span>
          </div>
          <div className={`${styles.leftIcon} ${styles.clock}`}>
            <span className="material-symbols-outlined">schedule</span>
          </div>
        </div>
        <div className={styles.time}>8 feb 2023</div>
      </div>
    </div>
  );
}
