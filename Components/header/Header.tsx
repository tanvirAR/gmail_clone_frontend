import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gmail_logo from "../../public/logo.png";
import styles from "./Header.module.css";
import { sidebarByToggle } from "../../features/UI/UISlice";
import { useDispatch, useSelector } from "react-redux";
import EmailSearchFilterDiv from "./EmailSearchFilterDiv";
import storeStateInterface from "../../interface/Store.interface";
import { useRouter } from "next/router";
import { accountNumber } from "../../constants/constants";
import Logout from "./Logout";
import { emailSearchQuery } from "../../interface/emailSearchQuery.interace";
import Link from "next/link";
const Header = () => {
  const router = useRouter();
  const [primarySearchQuerey, setPrimarySearchQuery] = useState("");

  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const logoutOptionToggleButtonRef = useRef<HTMLSpanElement | null>(null);

  // show. unshow search container
  const [searchContainer, setSearchContainer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchFilterDivToggleButtnRef = useRef<HTMLSpanElement | null>(null);

  const dispatch = useDispatch();

  // get current sidebar toggle state
  const { UI, auth } = useSelector((state: storeStateInterface) => state);

  const { sidebarOn } = UI;
  const { user } = auth;
  const sidebarToggleHandler = () => {
    dispatch(sidebarByToggle(!sidebarOn.onByToggle));
  };

  const filterOptionsToggleHandler = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setSearchContainer((prevState) => !prevState);
  };

  const executeSearchButtonRef = useRef<HTMLDivElement>(null);

  const executeSearchListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
    /**  this is the default search only takes primarySearchQuery as main parameter without any advance filter, and only will execute if advanced filter component  @EmailSearchFilterDiv is not mounted or enabled. */
    if (
      e.key === "Enter" &&
      !searchContainer &&
      primarySearchQuerey.length > 0
    ) {
      const queryData: emailSearchQuery = {
        type: "allmail",
        dateWithIn: 365,
        hasWords: primarySearchQuerey.split(" "),
      };

      const params = new URLSearchParams();
      for (const key in queryData) {
        params.set(key, String(queryData[key as keyof emailSearchQuery]));
      }

      const paramsValue = params.toString();

      router.push(`/mail/u/${accountNumber}/search/${paramsValue}`);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-left"]}>
          <span
            style={{
              backgroundColor: sidebarOn.onByToggle
                ? " #dce7ee"
                : "transparent",
            }}
            onClick={sidebarToggleHandler}
            className={`material-icons ${styles.menuIcon}`}
          >
            menu
          </span>
          <Image
            onClick={() => router.push(`/mail/u/${accountNumber}/inbox`)}
            priority
            className={styles.logo}
            src={gmail_logo}
            alt="logo"
          />
        </div>
        <div className={styles["header-middle"]}>
          <span className={"material-icons"}>search</span>
          <input
            spellCheck={false}
            value={primarySearchQuerey}
            onChange={(e) => setPrimarySearchQuery(e.target.value)}
            onKeyDown={executeSearchListener}
            ref={inputRef}
            type="text"
            placeholder="Search mail"
          />

          <span
            onClick={filterOptionsToggleHandler}
            ref={searchFilterDivToggleButtnRef}
            className={`material-icons ${styles.openFilter}`}
          >
            tune
          </span>
        </div>
        <div className={styles["header-right"]}>
          <div className={styles.help}>
            <span className="material-symbols-outlined">help</span>
            <div className={styles.creator}>
              <p>Created By:</p>

                <p>Tanvir AR</p>

              <p>tanvir.ar.47@gmail.com</p>
            </div>
          </div>
          <div
            className={`${styles.settingsIcon} ${
              showLogoutOption ? styles.optionToggled : ""
            }`}
          >
            <span
              ref={logoutOptionToggleButtonRef}
              onClick={() => setShowLogoutOption((prev) => !prev)}
              className="material-icons"
            >
              settings
            </span>
            {showLogoutOption && (
              <Logout
                setShowComponent={setShowLogoutOption}
                toggleButtonRef={logoutOptionToggleButtonRef}
              />
            )}
          </div>
          <div className={styles.userIcon}>
            <span className={`material-icons ${styles.profileIcon}`}>
              account_circle
            </span>
            <div className={styles.accountSettings}>
              <p>Gmail Account</p>
              <p>{user?.name || ""}</p>
              <p>
                <i>{user?.email || ""}</i>
              </p>
            </div>
          </div>
        </div>

        {searchContainer && (
          <EmailSearchFilterDiv
            setShowComponent={setSearchContainer}
            toggleButtonRef={searchFilterDivToggleButtnRef}
            primarySearchedQuery={primarySearchQuerey}
            executeSearchButtonRef={executeSearchButtonRef}
          />
        )}
      </header>
    </>
  );
};

export default Header;
