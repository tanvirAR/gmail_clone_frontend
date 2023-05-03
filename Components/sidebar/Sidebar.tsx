import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.css";
import { sentEmailBoxSmall, sidebarByHover } from "../../features/UI/UISlice";
import storeStateInterface from "../../interface/Store.interface";
import { useRouter } from "next/router";
import pathMatch from "../../utils/pathMatch";

const Sidebar = () => {
  const [seeMore, setSeeMore] = useState(false);

  const router = useRouter();
  const path = router.asPath.toString();
  const currentPath = pathMatch(path);

  const dispatch = useDispatch();

  const openSentEmailBox = () => {
    dispatch(sentEmailBoxSmall(true));
  };

  const { sidebarOn } = useSelector((state: storeStateInterface) => state.UI);

  const redirectToPageHandler = (page: string) => {
    router.push(`/mail/u/1/${page}`);
  };

  const bgConditionalStylesForSidebarSingleOption = (page: string) => {
    let style1 = "";
    let style2 = "";
    if (currentPath === page && !sidebarOn.onByHover && !sidebarOn.onByToggle) {
      style1 = styles["bold-minimized"];
    }

    if (currentPath == page) {
      style2 = styles.bold;
    } else {
      style2 = styles.light;
    }

    return `${style1} ${style2} ${styles.sidebarOption}`;
  };

  const isExtendedSidebar = sidebarOn.onByToggle || sidebarOn.onByHover;

  return (
    <div
      onMouseEnter={() => dispatch(sidebarByHover(true))}
      onMouseLeave={() => dispatch(sidebarByHover(false))}
      style={sidebarOn.onByToggle ? { width: "230px", position: "static" } : {}}
      className={styles.sidebar}
    >
      <button onClick={openSentEmailBox} className={styles["sidebar-compose"]}>
        <span className={"material-symbols-outlined"}>add</span>
        {isExtendedSidebar && `compose`}
      </button>
      <div
        onClick={() => redirectToPageHandler("inbox")}
        className={bgConditionalStylesForSidebarSingleOption("inbox")}
      >
        <span className={"material-symbols-outlined"}>inbox</span>
        {isExtendedSidebar && <h3>Inbox</h3>}
      </div>
      <div
        onClick={() => redirectToPageHandler("starred")}
        className={bgConditionalStylesForSidebarSingleOption("starred")}
      >
        <span className="material-symbols-outlined">star</span>

        {isExtendedSidebar && <h3>Starred</h3>}
      </div>
      <div
        onClick={() => redirectToPageHandler("snoozed")}
        className={bgConditionalStylesForSidebarSingleOption("snoozed")}
      >
        <span className={"material-symbols-outlined"}>access_time</span>
        {isExtendedSidebar && <h3>Snoozed</h3>}
      </div>
      <div
        onClick={() => redirectToPageHandler("important")}
        className={bgConditionalStylesForSidebarSingleOption("important")}
      >
        <span className="material-symbols-outlined">label_important</span>
        {isExtendedSidebar && <h3>Important</h3>}
      </div>
      <div
        onClick={() => redirectToPageHandler("sent")}
        className={bgConditionalStylesForSidebarSingleOption("sent")}
      >
        <span className="material-symbols-outlined">send</span>

        {isExtendedSidebar && <h3>Sent</h3>}
      </div>
      <div
        onClick={() => redirectToPageHandler("drafts")}
        className={bgConditionalStylesForSidebarSingleOption("drafts")}
      >
        <span className={"material-symbols-outlined"}>note</span>
        {isExtendedSidebar && <h3>Drafts</h3>}
      </div>
      {!seeMore && (
        <div onClick={() => setSeeMore(true)} className={styles.sidebarOption}>
          <span className={"material-symbols-outlined"}>expand_more</span>
          {isExtendedSidebar && <h3>More</h3>}
        </div>
      )}
      {seeMore && (
        <>
          <div
            onClick={() => setSeeMore(false)}
            className={styles.sidebarOption}
          >
            <span className={"material-symbols-outlined"}>expand_less</span>
            {isExtendedSidebar && <h3>Less</h3>}
          </div>

          <div
            onClick={() => redirectToPageHandler("scheduled")}
            className={bgConditionalStylesForSidebarSingleOption("scheduled")}
          >
            <span className="material-symbols-outlined">schedule_send</span>

            {isExtendedSidebar && <h3>Schedule Send</h3>}
          </div>

          <div
            onClick={() => redirectToPageHandler("spam")}
            className={bgConditionalStylesForSidebarSingleOption("spam")}
          >
            <span className={"material-symbols-outlined"}>report</span>
            {isExtendedSidebar && <h3>Spam</h3>}
          </div>

          <div
            onClick={() => redirectToPageHandler("trash")}
            className={bgConditionalStylesForSidebarSingleOption("trash")}
          >
            <span className={"material-symbols-outlined"}>delete</span>
            {isExtendedSidebar && <h3>Trash</h3>}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Sidebar);
