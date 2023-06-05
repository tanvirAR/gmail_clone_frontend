import { useEffect, useRef } from "react";
import styles from "./Logout.module.css"
import { LoadingCircle } from "../common/Loader/LoadingCircle";
import { useLogoutMutation } from "../../features/auth/authApi";

interface props {
  setShowComponent: any;
  toggleButtonRef: any;
}

export default function Logout(props: props) {
  const { setShowComponent, toggleButtonRef } = props;
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


   const [logout, {data, isLoading, isError}] = useLogoutMutation()

   useEffect(() => {
    if (data && !isLoading) {
      /*  user can be redirected to the signin page without page reload but for better User Experience and to show the logo animation, page here is reloaded    */
      window.location.reload()
    }
   }, [data, isError])

   const logoutHandler = () => {
    logout()
   }

  return (
    <div onClick={logoutHandler} ref={thisCompRef} className={styles.settingsBox}>
      <p>Logout</p>
     {isLoading && <LoadingCircle />}
    </div>
  );
}
