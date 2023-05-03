import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Options.module.css";
import MoreOptions from "./MoreOptions";
import SelectMailByCategory from "./SelectMailByCategory";
import storeStateInterface from "../../interface/Store.interface";
import { setCurrentMailCategorySelected } from "../../features/email/emailSlice";
import MoveEmailOptionsDiv from "./MoveEmailsOptionsDiv";

interface props {
  refetch: any;
  buttonRef?: any;
}

export default function Options(props: props) {
  const { refetch: emailsRefetch, buttonRef } = props;
  const dispatch = useDispatch();

  const [emailCategoryDivShow, setEmailCategoryDivShow] = useState(false);
  const emailCategoryDivShowButtonRef = useRef<HTMLSpanElement | null>(null);

  const [moreOptionsShow, setMoreOptionsShow] = useState(false);
  const moreOptionsShowButtonRef = useRef<HTMLSpanElement | null>(null);

  const { email } = useSelector((state: storeStateInterface) => state);
  const { currentSelected, selectedMails } = email || {};

  const [moveEmailOptionDivShow, setMoveEmailOptionDivShow] = useState(false);
  const moveEmailOptionDivRef = useRef<HTMLSpanElement | null>(null);

  const [checkbox, setCheckbox] = useState(false);
  // this function execute either all the mails are selected or none at all which makes makes vice versa
  const checkBoxToggleHandler = () => {
    if (!checkbox) {
      dispatch(setCurrentMailCategorySelected("allMail"));
    } else {
      setCheckbox(false);
      dispatch(setCurrentMailCategorySelected("none"));
    }
  };

  const refetchInboxMailsHandler = () => {
    // reset the email slice before refetching evry mails
    // dispatch(reset());
    emailsRefetch();
    buttonRef.current.click();
  };

  // changing state to show/unshow selecting email category div
  const toggleEmailSelectCategoryDiv = () => {
    setEmailCategoryDivShow((prevState) => !prevState);
  };

  const toggleMoreOptionsShowDivHandler = () => {
    setMoreOptionsShow((prevState) => !prevState);
  };

   const closeMoveEmailDivHandler = () => {
     setMoveEmailOptionDivShow((prevState) => !prevState);
   };

  useEffect(() => {
    if (currentSelected) {
      if (currentSelected === "allMail") {
        setCheckbox(true);
      }
      if (currentSelected === "none") {
        setCheckbox(false);
      }
    }
  }, [currentSelected]);

  const deselectingAllMails = () => {
    dispatch(setCurrentMailCategorySelected("none"));
    setCheckbox(false);
  };

  const isCheckBoxTickOrUnTick =
    currentSelected === "none" ||
    currentSelected === "allMail" ||
    selectedMails.length === 0;

  const isCheckBoxThirdIcon =
    currentSelected !== "none" &&
    currentSelected !== "allMail" &&
    selectedMails.length > 0; 

  const moveEmailButtonShow: boolean = selectedMails.length > 0 

  return (
    <div className={styles["emailList-settings"]}>
      <div className={styles["settings-left"]}>
        <div className={styles.selectAll_div}>
          {isCheckBoxTickOrUnTick && (
            <span
              onClick={checkBoxToggleHandler}
              className="material-symbols-outlined"
            >
              {checkbox ? "check_box" : "check_box_outline_blank"}
            </span>
          )}
          {isCheckBoxThirdIcon && (
            <span
              onClick={deselectingAllMails}
              className="material-symbols-outlined"
            >
              indeterminate_check_box
            </span>
          )}
          <span
            ref={emailCategoryDivShowButtonRef}
            onClick={toggleEmailSelectCategoryDiv}
            className={`material-symbols-outlined ${
              emailCategoryDivShow ? styles.optionsToggled : ""
            }`}
          >
            arrow_drop_down
          </span>
        </div>

        <span
          ref={buttonRef}
          onClick={refetchInboxMailsHandler}
          className={"material-icons"}
        >
          refresh
        </span>

     { moveEmailButtonShow &&  <span
          onClick={closeMoveEmailDivHandler}
          ref={moveEmailOptionDivRef}
          className={`material-symbols-outlined ${
            moveEmailOptionDivShow ? styles.optionsToggled : ""
          }`}
        >
          drive_file_move
        </span>}

        <span
          onClick={toggleMoreOptionsShowDivHandler}
          ref={moreOptionsShowButtonRef}
          className={`material-icons ${
            moreOptionsShow ? styles.optionsToggled : ""
          }`}
        >
          more_vert
        </span>
      </div>
      <div className={styles["settings-right"]}>
        <span className="material-icons">chevron_left</span>
        <span className="material-icons">chevron_right</span>
      </div>
      {emailCategoryDivShow && (
        <SelectMailByCategory
          toggleButtonRef={emailCategoryDivShowButtonRef}
          setShowComponent={setEmailCategoryDivShow}
        />
      )}
      {moreOptionsShow && (
        <MoreOptions
          setShowComponent={setMoreOptionsShow}
          toggleButtonRef={moreOptionsShowButtonRef}
        />
      )}
      {moveEmailOptionDivShow && (
        <MoveEmailOptionsDiv
          setShowComponent={setMoveEmailOptionDivShow}
          toggleButtonRef={moveEmailOptionDivRef}
        />
      )}
    </div>
  );
}
