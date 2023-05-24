import { useEffect, useRef } from "react";
import styles from "./SnoozeOption.module.css"


interface props {
  setShowComponent: any;
  toggleButtonRef: any;
}

const SnoozeOption = (props: props) => {

    const thisCompRef = useRef<HTMLDivElement | null>(null)

    const {setShowComponent, toggleButtonRef} = props;

     useEffect(() => {
       // Function to handle when clicks outside the popup to hide this component
       const handleClickOutside = (event: MouseEvent) => {
         if (
           thisCompRef.current &&
           !thisCompRef.current.contains(event.target as Node)
         ) {
          console.log(event.target)
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

  return (
    
      <div ref={thisCompRef} className={styles.box}>
        <span className="material-symbols-outlined">event</span>
        <p>Pick date & time</p>
      </div>
    
  );
}


export default SnoozeOption;