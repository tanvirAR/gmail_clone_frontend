import styles from "./MoreOptions.module.css";

export default function MoreOptions() {
  return (
    <div className={styles.more}>
      <div className={styles.firstP}>
        <p>Mark all as read</p>
      </div>
      <div className={styles.linebreak}></div>
      <div className={styles.secondP}>
        <p>Select messages to see more action</p>
      </div>
    </div>
  );
}
