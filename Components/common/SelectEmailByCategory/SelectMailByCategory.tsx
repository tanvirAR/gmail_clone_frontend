import { useEffect, useRef } from "react";
import styles from "./SelectMailByCategory.module.css";
import { useDispatch } from "react-redux";
import { resetSelectedMails, setCurrentMailCategorySelected } from "../../../features/email/emailSlice";

interface props {
  setShowComponent: any;
  toggleButtonRef: any;
}

export default function SelectMailByCategory(props: props) {
  const { setShowComponent, toggleButtonRef } = props;
  const thisCompRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

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



  const selectMailCategoryHandler = (type: string) => {
    dispatch(setCurrentMailCategorySelected(type));
    if (type==="none"){
      dispatch(resetSelectedMails())
    }
    // after selecting, close tis component
    setShowComponent(false);
  };

  return (
    <div ref={thisCompRef} className={styles.selectMailByCategory}>
      <div onClick={() => selectMailCategoryHandler("allMail")}>
        <p>All</p>
      </div>
      <div onClick={() => selectMailCategoryHandler("none")}>
        <p>None</p>
      </div>

      <div onClick={() => selectMailCategoryHandler("read")}>
        <p>Read</p>
      </div>

      <div onClick={() => selectMailCategoryHandler("unRead")}>
        <p>Unread</p>
      </div>

      <div onClick={() => selectMailCategoryHandler("starred")}>
        <p>Starred</p>
      </div>

      <div onClick={() => selectMailCategoryHandler("unStarred")}>
        <p>Unstarred</p>
      </div>

      <div onClick={() => selectMailCategoryHandler("important")}>
        <p>Important</p>
      </div>

      <div onClick={() => selectMailCategoryHandler("unImportant")}>
        <p>Unimportant</p>
      </div>
    </div>
  );
}
