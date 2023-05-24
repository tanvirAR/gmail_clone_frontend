import { useEffect, useRef } from "react";
import styles from "./MoveEmailsOptionsDiv.module.css"
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";
import { useMarkMailAsSocialMutation } from "../../features/socialMail/socialMailApi";
import { useMarkMailAsPromotionMutation } from "../../features/promotionsMail/promotionsMailApi";
import { useMarkMailAsSpamMutation } from "../../features/spamMail/spamMailApi";
import { useMarkTrashSingleInboxMailMutation } from "../../features/trashMail/trashMailApi";
import { emailType } from "../../interface/EmailTypeForSpecificPage.interface";
import { inboxType, scheduledType, sentType, spamType, trashType } from "../../interface/EmailType";
import { useCancellScheduledMailMutation } from "../../features/scheduledMail/scheduledMailApi";
import { useMoveFromSentToInboxMutation, useMoveFromSpamToInboxMutation, useMoveFromTrashToInboxMutation } from "../../features/moveEmail/moveEmailApi";

interface props {
  setShowComponent: any;
  toggleButtonRef: any;
  pageType: emailType;
}

export default function MoveEmailOptionsDiv(props: props) {
  const { setShowComponent, toggleButtonRef, pageType } = props;
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






  const [markMailAsSocial , {}] = useMarkMailAsSocialMutation();
  const [markMailAsPromotion, {}] = useMarkMailAsPromotionMutation();
  const [ markMailAsTrash, {} ] = useMarkTrashSingleInboxMailMutation()
  const [markMailAsSpam, {}] = useMarkMailAsSpamMutation();


 const { email, additionalEmailData } = useSelector((state: storeStateInterface) => state);
 const {  selectedMails } = email;

 const moveToSocialHandler = () => {
    // for (let i = 0; i < selectedMails.length; i++){
    //   const mailId = selectedMails[i];
    //   markMailAsSocial({mailId})
    // }
    // // close this component after sending request
    //  setShowComponent(false);
 }

  const moveToPromotionHandler = () => {
    // for (let i = 0; i < selectedMails.length; i++) {
    //   const mailId = selectedMails[i];
    //   markMailAsPromotion({ mailId });
    // }
    // // close this component after sending request
    // setShowComponent(false);
  };


   const moveToSpamHandler = () => {
     for (let i = 0; i < selectedMails.length; i++) {
       const mailId = selectedMails[i];
       markMailAsSpam({ mailId });
     }
     // close this component after sending request
     setShowComponent(false);
   };

    const moveToTrashHandler = () => {
      for (let i = 0; i < selectedMails.length; i++) {
        const mailId = selectedMails[i];
        markMailAsTrash(mailId);
      }
      // close this component after sending request
      setShowComponent(false);
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



    // if user is in trash page, hide the "move to trash" option
  const isTrashOptionVisible: boolean = pageType!==trashType;
  const isInboxOptionVisible: boolean = pageType !== inboxType && pageType !== spamType;
  const isSpamOptionVisible: boolean =  pageType !== spamType;
      // const isTrashOptionVisible: boolean = 
  return (
    <div ref={thisCompRef} className={styles.main}>
      <div className={styles.title}>
        <p>Move to:</p>
      </div>

      <div className={styles.line1}></div>
      
     {isInboxOptionVisible &&  <div onClick={moveEmailToInboxHandler}>
        <p>Inbox</p>
      </div>}

      <div onClick={moveToSocialHandler}>
        <p>Social</p>
      </div>

      <div onClick={moveToPromotionHandler}>
        <p>Promotions</p>
      </div>

      <div className={styles.line2}></div>

     {isSpamOptionVisible && <div onClick={moveToSpamHandler}>
        <p>Spam</p>
      </div>
}
      {isTrashOptionVisible && (
        <div onClick={moveToTrashHandler}>
          <p>Trash</p>
        </div>
      )}
    </div>
  );
}
