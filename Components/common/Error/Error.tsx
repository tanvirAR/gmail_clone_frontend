import React from 'react'
import errorIcon from "../../../assets/error.svg";
import Image from "next/image";
import styles from "./Error.module.css";


interface ErrorProps {
  message: string | boolean;
}

 const Error = (props: ErrorProps) => {
  return(
  <div className={styles.container}>
    <Image
      draggable={false}
      className={styles.imageStyles}
      src={errorIcon}
      alt=""
    />
    <div className={styles.p}>
      <p draggable={false}>{props.message}</p>
    </div>
  </div>
);
}

export default Error;
