import errorIcon from "../assets/error.svg"
import Image from "next/image"
import styles from "../styles/Error.module.css"

export default function error({message}) {

  return (
    <div className={styles.container}>
      <Image draggable={false} className={styles.imageStyles} src={errorIcon} alt="" />
      <div className={styles.p}>
       <p draggable={false}>{message}</p>
      </div>
    </div>
  );
}




