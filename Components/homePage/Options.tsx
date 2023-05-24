import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Options.module.css";
import MoreOptions from "./MoreOptions";
import SelectMailByCategory from "./SelectMailByCategory";
import storeStateInterface from "../../interface/Store.interface";
import { setCurrentMailCategorySelected } from "../../features/email/emailSlice";
import MoveEmailOptionsDiv from "./MoveEmailsOptionsDiv";
import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import {
  importantType,
  scheduledType,
  sentType,
  spamType,
  starredType,
  trashType,
} from "../../interface/EmailType";
import { useMarkMailAsUnSpamMutation } from "../../features/spamMail/spamMailApi";
import { useDeleteMailPermanentlyMutation } from "../../features/trashMail/trashMailApi";
import {
  useMoveFromSentToInboxMutation,
  useMoveFromSpamToInboxMutation,
  useMoveFromTrashToInboxMutation,
} from "../../features/moveEmail/moveEmailApi";
import { useCancellScheduledMailMutation } from "../../features/scheduledMail/scheduledMailApi";

interface props {
  refetch: any;
  buttonRef: any;
  pageType: emailType;
}

export default function Options(props: props) {
  const { refetch: emailsRefetch, buttonRef, pageType } = props;
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

  const moveEmailButtonShow: boolean =
    selectedMails.length > 0 &&
    pageType !== scheduledType &&
    pageType !== starredType &&
    pageType !== importantType;

  const moveToInboxOptionVisible: boolean =
    selectedMails.length > 0 &&
    pageType !== scheduledType &&
    pageType !== starredType &&
    pageType !== importantType;

  const showDeleteForeverOption: boolean =
    selectedMails.length > 0 &&
    (pageType === trashType || pageType === spamType);
  const showNotSpamOption: boolean =
    selectedMails.length > 0 && pageType === spamType;
  const showCancelSendOption: boolean =
    selectedMails.length > 0 && pageType === scheduledType;

  const [
    markMailUnspam,
    {
      data: markMailUnspamResponse,
      error: markMailUnspamError,
      isLoading: markMailUnspamIsLoading,
    },
  ] = useMarkMailAsUnSpamMutation();
  const [
    deleteMailPermenantly,
    {
      data: deleMailResponse,
      error: deleteMailErrorResponse,
      isLoading: deleteMailIsLoading,
    },
  ] = useDeleteMailPermanentlyMutation();

  const deleteMailForeverHandler = () => {
    // double checking selectedmals length, thoush it will be hide if length is zero customized above
    if (selectedMails.length > 0 && !deleteMailIsLoading) {
      // using a for loop to send rtk request for each selected mails ID
      for (let i = 0; i < selectedMails.length; i++) {
        deleteMailPermenantly(selectedMails[i]);
      }
    }
  };

  const notSpamHandler = () => {
    for (let i = 0; i < selectedMails.length; i++) {
      // using a for loop to send rtk request for each selected mails ID
      for (let i = 0; i < selectedMails.length; i++) {
        markMailUnspam({ mailId: selectedMails[i] });
      }
    }
  };

  const [cancelScheduledSend, { isLoading: cancelScheduledIsLoading }] =
    useCancellScheduledMailMutation();

  const [moveFromSentToInbox, { isLoading: sentToInboxIsLoading }] =
    useMoveFromSentToInboxMutation();
  const [moveFromSpamToInbox, { isLoading: spamToInboxIsLoading }] =
    useMoveFromSpamToInboxMutation();
  const [moveFromTrashToInbox, { isLoading: trashToInboxIsLoading }] =
    useMoveFromTrashToInboxMutation();

  const moveEmailToInboxHandler = () => {
    if (
      selectedMails.length > 0 &&
      !cancelScheduledIsLoading &&
      !sentToInboxIsLoading &&
      !spamToInboxIsLoading &&
      !trashToInboxIsLoading
    ) {
      if (pageType === scheduledType) {
        for (let i = 0; i < selectedMails.length; i++) {
          cancelScheduledSend(selectedMails[i]);
        }
      } else if (pageType === sentType) {
        for (let i = 0; i < selectedMails.length; i++) {
          moveFromSentToInbox({ mailId: selectedMails[i] });
        }
      } else if (pageType === spamType) {
        for (let i = 0; i < selectedMails.length; i++) {
          moveFromSpamToInbox({ mailId: selectedMails[i] });
        }
      } else if (pageType === trashType) {
        for (let i = 0; i < selectedMails.length; i++) {
          moveFromTrashToInbox({ mailId: selectedMails[i] });
        }
      }
    }
  };

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
            className={`material-symbols-outlined ${styles.dropDown} ${
              emailCategoryDivShow ? styles.optionsToggled : ""
            }`}
          >
            arrow_drop_down
          </span>
        </div>

        {showDeleteForeverOption && (
          <div
            onClick={deleteMailForeverHandler}
            className={styles.deleteForever}
          >
            <p>Delete forever</p>
          </div>
        )}
        {showNotSpamOption && (
          <div onClick={notSpamHandler} className={styles.deleteForever}>
            <p>Not Spam</p>
          </div>
        )}

        {showCancelSendOption && (
          <div className={styles.deleteForever}>
            <p>Cancel send</p>
          </div>
        )}

        <div className={styles.refresh}>
          <span
            ref={buttonRef}
            onClick={refetchInboxMailsHandler}
            className={"material-icons"}
          >
            refresh
          </span>
          <div className={styles.refreshP}>refresh</div>
        </div>
        {moveToInboxOptionVisible && (
          <div className={styles.moveToInbox} onClick={moveEmailToInboxHandler}>
            <span className={`material-symbols-outlined`}>move_to_inbox</span>
            <div className={styles.moveToInboxP}>Move To inbox</div>
          </div>
        )}

        {moveEmailButtonShow && (
          <div className={styles.moveTo}>
            <span
              onClick={closeMoveEmailDivHandler}
              ref={moveEmailOptionDivRef}
              className={`material-symbols-outlined ${
                moveEmailOptionDivShow ? styles.optionsToggled : ""
              }`}
            >
              drive_file_move
            </span>
            {moveEmailOptionDivShow && (
              <MoveEmailOptionsDiv
                pageType={pageType}
                setShowComponent={setMoveEmailOptionDivShow}
                toggleButtonRef={moveEmailOptionDivRef}
              />
            )}
          </div>
        )}

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
          pageType={pageType}
          setShowComponent={setMoreOptionsShow}
          toggleButtonRef={moreOptionsShowButtonRef}
        />
      )}
      {/* {moveEmailOptionDivShow && (
        <MoveEmailOptionsDiv
          pageType={pageType}
          setShowComponent={setMoveEmailOptionDivShow}
          toggleButtonRef={moveEmailOptionDivRef}
        />
      )} */}
    </div>
  );
}
