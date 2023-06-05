import styles from "./InboxEmails.module.css"

export default function EmailList(props: any) {
  const { emailList } = props;

  return <div className={styles.cont}>{emailList}</div>;
}
