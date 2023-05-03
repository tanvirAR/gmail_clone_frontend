import Image from "next/image";
import { useRef, useState } from "react";
import gmail_logo from "../../assets/logo.png";
import styles from "./Header.module.css";
import { sidebarByToggle } from "../../features/UI/UISlice";
import { useDispatch, useSelector } from "react-redux";
import EmailSearchFilterDiv from "./EmailSearchFilterDiv";
import helpIcon from "../../assets/help.svg";
import storeStateInterface from "../../interface/Store.interface";


const Header = () => {

 // show. unshow search container
 const [searchContainer, setSearchContainer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


 const dispatch = useDispatch();

 // get current sidebar toggle state
 const { sidebarOn } = useSelector((state: storeStateInterface) => state.UI);

 const sidebarToggleHandler = () => {
 
   dispatch(sidebarByToggle(!sidebarOn.onByToggle));
 };

 const filterOptionsToggleHandler = () => {
   if (inputRef.current){
   inputRef.current.focus();
  }
  setSearchContainer((prevState) => !prevState)
 }
 
 return (
   <>
     <header className={styles.header}>
       <div className={styles["header-left"]}>
         <span
           style={{
             backgroundColor: sidebarOn.onByToggle ? " #dce7ee" : "transparent",
           }}
           onClick={sidebarToggleHandler}
           className={`material-icons ${styles.menuIcon}`}
         >
           menu
         </span>
         <Image priority src={gmail_logo} alt="logo" />
       </div>
       <div className={styles["header-middle"]}>
         <span className={"material-icons"}>search</span>
         <input
         ref={inputRef}
           type="text"
           placeholder="Search mail"
         />
         <button onClick={filterOptionsToggleHandler}>
           <span className={"material-icons"}>arrow_drop_down</span>
         </button>
       </div>
       <div className={styles["header-right"]}>
         {/* <span className={"material-icons"}>help</span> */}
         <Image src={helpIcon} alt="" />
         <span className="material-icons">settings</span>

         <span className={`material-icons ${styles.profileIcon}`}>account_circle</span>
       </div>
       {searchContainer && <EmailSearchFilterDiv />}
     </header>
   </>
 );
};

export default Header;
