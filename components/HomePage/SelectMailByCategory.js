import styles from "../../../../../styles/inboxPage/SelectMailByCategory.module.css"

export default function SelectMailByCategory() {
  return (
    <div className={styles.selectMailByCategory}>
      <div>
        <p>All</p>
      </div>
      <div>
        <p>None</p>
      </div>

      <div>
        <p>Read</p>
      </div>

      <div>
        <p>Unread</p>
      </div>

      <div>
        <p>Starred</p>
      </div>

      <div>
        <p>Unstarred</p>
      </div>
    </div>
  );
}
