import styles from "../../../../../styles/inboxPage/EmailSection.module.css"


export default function EmailSection() {
  return (
    <div className={styles["emailList_sections"]}>
      <div className={`${styles["section"]} ${styles["section_selected"]}`}>
        <span className="material-icons"> inbox </span>
        <h4>Primary</h4>
      </div>

      <div className={styles.section}>
        <span className="material-icons"> people </span>
        <h4>Social</h4>
      </div>

      <div className={styles.section}>
        <span className="material-icons"> local_offer </span>
        <h4>Promotions</h4>
      </div>
    </div>
  );
}
