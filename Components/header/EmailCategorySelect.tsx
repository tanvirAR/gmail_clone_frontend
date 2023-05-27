import { useEffect, useRef, useState } from "react";
import styles from "./EmailSearchFilterDiv.module.css";
import {
  allMail,
  allMailUI,
  emailCategoryUIList,
  emailCategoryUIType,
  read,
  unread,
  inbox,
  inboxUI,
  readUI,
  searchMailType,
  sent,
  sentMailUI,
  spam,
  spamAndTrash,
  spamAndTrashUI,
  spamUI,
  starred,
  starredUI,
  trash,
  trashUI,
  unReadUI,
} from "../../interface/searchEmailCategory.interface";

interface props {
  toggleButtonRef: any;
  setShowComponent: any;
  setCategory: any;
}

export default function EmailCategorySelect(props: props) {
  const { setShowComponent, toggleButtonRef, setCategory } = props;
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

  const emailCategorySelectHandler = (type: emailCategoryUIType) => {
    switch (type) {
      case allMailUI:
        setCategory(allMail);
        break;

      case inboxUI:
        setCategory(inbox);
        break;

      case starredUI:
        setCategory(starred);
        break;

      case sentMailUI:
        setCategory(sent);
        break;

      case spamUI:
        setCategory(spam);
        break;

      case trashUI:
        setCategory(trash);
        break;

      case spamAndTrashUI:
        setCategory(spamAndTrash);
        break;

      case readUI:
        setCategory(read);
        break;

      case unReadUI:
        setCategory(unread);
        break;

      default:
        setCategory(allMail);
    }
    setShowComponent(false);
  };

  const contents = emailCategoryUIList.map((category) => (
    <div
      onClick={() => emailCategorySelectHandler(category)}
      className={styles.singleCategory}
      key={category}
    >
      <p>{category}</p>
    </div>
  ));

  return (
    <div ref={thisCompRef} className={styles.category}>
      {contents}
    </div>
  );
}
