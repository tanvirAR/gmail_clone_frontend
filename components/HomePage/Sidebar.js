import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../../../styles/inboxPage/Sidebar.module.css'
import { sentEmailBoxSmall } from "../../../../../features/UI/UISlice";
import { sidebarByHover } from "../../../../../features/UI/UISlice";
import starIcon from "../../../../../assets/star.svg"
import labelIcon from "../../../../../assets/label_important.svg"
import sendIcon from "../../../../../assets/sendMailicon.svg"
import scheduleSendIcon from "../../../../../assets/schedule_send_icon.svg"
import Image from 'next/image';


export default function Sidebar() {
  // const start = {
  //   font-variation-settings:
  // }
  const [seeMore, setSeeMore] = useState(false)


  const dispatch = useDispatch()
  const openSentEmailBox =  () => {
    dispatch(sentEmailBoxSmall(true))
  }

const { sidebarOn } = useSelector((state) => state.UI);


  return (
    <div
      onMouseEnter={() => dispatch(sidebarByHover(true))}
      onMouseLeave={() => dispatch(sidebarByHover(false))}
      style={{
        maxWidth:
          sidebarOn.onByToggle || sidebarOn.onByHover ? "230px" : "70px",
      }}
      className={styles.sidebar}
    >
      <button onClick={openSentEmailBox} className={styles["sidebar-compose"]}>
        <span className={"material-icons"}>add</span>
        {(sidebarOn.onByToggle || sidebarOn.onByHover) && `compose`}
      </button>
      <div className={styles["sidebarOption"]}>
        <span className={"material-icons"}>inbox</span>
        {(sidebarOn.onByToggle || sidebarOn.onByHover) && <h3>Inbox</h3>}
      </div>
      <div className={styles.sidebarOption}>
        {/* <span className={"material-icons"}>star</span> */}
        <Image className={styles.starImage} src={starIcon} alt="" />

        {(sidebarOn.onByToggle || sidebarOn.onByHover) && <h3>Starred</h3>}
      </div>
      <div className={styles.sidebarOption}>
        <span className={"material-icons"}>access_time</span>
        {(sidebarOn.onByToggle || sidebarOn.onByHover) && <h3>Snoozed</h3>}
      </div>
      <div className={styles.sidebarOption}>
        {/* <span className={"material-icons"}>label_important</span> */}
        <Image className={styles.labelImage} src={labelIcon} alt="" />
        {(sidebarOn.onByToggle || sidebarOn.onByHover) && <h3>Important</h3>}
      </div>
      <div className={styles.sidebarOption}>
        {/* <span className={"material-icons"}>near_me</span> */}
        <Image className={styles.labelImage} src={sendIcon} alt="" />

        {(sidebarOn.onByToggle || sidebarOn.onByHover) && <h3>Sent</h3>}
      </div>
      <div className={styles.sidebarOption}>
        <span className={"material-icons"}>note</span>
        {(sidebarOn.onByToggle || sidebarOn.onByHover) && <h3>Drafts</h3>}
      </div>
      {!seeMore && (
        <div onClick={() => setSeeMore(true)} className={styles.sidebarOption}>
          <span className={"material-icons"}>expand_more</span>
          {(sidebarOn.onByToggle || sidebarOn.onByHover) && <h3>More</h3>}
        </div>
      )}
      {seeMore && (
        <>
          <div
            onClick={() => setSeeMore(false)}
            className={styles.sidebarOption}
          >
            <span className={"material-icons"}>expand_less</span>
            {(sidebarOn.onByToggle || sidebarOn.onByHover) && <h3>Less</h3>}
          </div>

          <div className={styles.sidebarOption}>
            {/* <span className={"material-icons"}>label_important</span> */}
            <Image className={styles.starImage} src={scheduleSendIcon} alt="" />

            {(sidebarOn.onByToggle || sidebarOn.onByHover) && (
              <h3>Schedule Send</h3>
            )}
          </div>

          <div className={styles.sidebarOption}>
            <span className={"material-icons"}>report</span>
            {(sidebarOn.onByToggle || sidebarOn.onByHover) && <h3>Spam</h3>}
          </div>

          <div className={styles.sidebarOption}>
            <span className={"material-icons"}>delete</span>
            {(sidebarOn.onByToggle || sidebarOn.onByHover) && <h3>Trash</h3>}
          </div>
        </>
      )}
    </div>
  );
}



    {/* <div className={styles["sidebarOption sidebarOption-active"]}>
        <span className={"material-icons"}>inbox</span>
        <h3>inbox</h3>
      </div> */}