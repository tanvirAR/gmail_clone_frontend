import Image from "next/image";
import { useState } from "react";
import gmail_logo from "../../assets/logo.png";
import styles from "./Header.module.css";
import {sidebarByToggle } from "../../features/UI/UISlice";
import { useDispatch, useSelector } from "react-redux";
import EmailSearchFilterDiv from "./EmailSearchFilterDiv";
import helpIcon from "../../assets/help.svg";

export default function Header() {
  const [inputFocus, setInputFocus] = useState(false);
  
  // show. unshow search container 
  const [searchContainer, setSearchContainer] = useState(false)

  const dispatch = useDispatch();

  // get current sidebar toggle state
  const { sidebarOn } = useSelector((state) => state.UI);

  const sidebarToggleHandler = () => {
    dispatch(sidebarByToggle(!sidebarOn.onByToggle));
  };


  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-left"]}>
          <span
            style={{
              backgroundColor: sidebarOn.onByToggle
                ? " #dddddd"
                : "transparent",
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
            onBlur={() => setInputFocus(false)}
            onFocus={() => setInputFocus(true)}
            type="text"
            placeholder="Search mail"
          />
          <button onClick={() => setSearchContainer((prevState) => !prevState)}>
            <span className={"material-icons"}>arrow_drop_down</span>
          </button>
        </div>
        <div className={styles["header-right"]}>
          {/* <span className={"material-icons"}>help</span> */}
          <Image src={helpIcon} alt='' />
          <span className={"material-icons"}>settings</span>

          <span className={"material-icons"}>account_circle</span>
        </div>
        {searchContainer && <EmailSearchFilterDiv />}
      </header>
    </>
  );
}

// inputFocus ? "white" : "#eaf1fb"
// sidebarOn.onByToggle ? '#eaf1fb' : 'transparent'