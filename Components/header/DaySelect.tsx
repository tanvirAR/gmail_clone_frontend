import { useEffect, useRef, useState } from "react";
import styles from "./EmailSearchFilterDiv.module.css"

interface props {
  toggleButtonRef: any;
  setShowComponent: any;
  setDaySelect: any;
}

export default function DaySelect(props: props) {
  const { setShowComponent, toggleButtonRef, setDaySelect } = props;
  const thisCompRef = useRef<HTMLDivElement | null>(null);

  
   useEffect(() => {
     // Function to handle when clicks outside the popup to hide this component
     const handleClickOutside = (event: MouseEvent) => {
       if (
         thisCompRef.current &&
         !thisCompRef.current.contains(event.target as Node)
       ) {
         // this div will close upon clicking outside but user can also clik on button which is also outside, so ref of that button is used here
         if (toggleButtonRef.current === event.target) {
           setShowComponent(true);
         } else {
           setShowComponent(false);
         }
       }
     };
     document.addEventListener("mousedown", handleClickOutside);

     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, [setShowComponent, toggleButtonRef]);

   const daySelectHandler = (numberOfDays: number) => {
      setDaySelect(numberOfDays);

      // finally close this component
      setShowComponent(false) 
   }

  return (
    <div ref={thisCompRef} className={styles.types}>
      <div onClick={() => daySelectHandler(1)} className={styles.type}>
        <p>1&nbsp;day</p>
      </div>
      <div onClick={() => daySelectHandler(3)} className={styles.type}>
        <p>3&nbsp;days</p>
      </div>
      <div onClick={() => daySelectHandler(7)} className={styles.type}>
        <p>1&nbsp;week</p>
      </div>
      <div onClick={() => daySelectHandler(14)} className={styles.type}>
        <p>2&nbsp;weeks</p>
      </div>
      <div onClick={() => daySelectHandler(31)} className={styles.type}>
        <p>1&nbsp;month</p>
      </div>
      <div onClick={() => daySelectHandler(62)} className={styles.type}>
        <p>2&nbsp;months</p>
      </div>
      <div onClick={() => daySelectHandler(31*6)} className={styles.type}>
        <p>6&nbsp;months</p>
      </div>
      <div onClick={() => daySelectHandler(365)} className={styles.type}>
        <p>1&nbsp;year</p>
      </div>
    </div>
  );
}
