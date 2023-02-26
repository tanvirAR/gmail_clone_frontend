import styles from "./EmailSearchFilterDiv.module.css"

export default function EmailSearchFilterDiv() {
  return (
    <div className={styles.emailSearchFilterDiv}>
      <div>
        <p>From</p>
        <input type="text" />
      </div>

      <div>
        <p>To</p>
        <input type="text" />
      </div>

      <div>
        <p>Subject</p>
        <input type="text" />
      </div>

      <div>
        <p>Has the words</p>
        <input type="text" />
      </div>

      <div>
        <p>Doesn't have</p>
        <input type="text" />
      </div>

      <div className={styles.dayWithin}>
        <p className={styles.day1}>Date Within</p>
        <div>
          <p>1 day</p>
        </div>
        <div className={styles.secondChild}>
          <p>Calender</p>
        </div>
      </div>


   <div className={styles.searchh}>
    <p>See From</p>
    <div>All mail</div>
   </div>

      <div className={styles.attachmentFilter}>
        <div>
          <input type="checkbox" />
          <p>Has attachment</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.createFilter}>
          <p>Create filter</p>
        </div>
        <div className={styles.bottomSearch}>
          <p>Search</p>
        </div>
      </div>
    </div>
  );
}
