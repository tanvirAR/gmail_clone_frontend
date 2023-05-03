import { useEffect, useRef } from "react";
import styles from "./MoveEmailsOptionsDiv.module.css"
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";
import { useMarkMailAsSocialMutation } from "../../features/socialMail/socialMailApi";
import { useMarkMailAsPromotionMutation } from "../../features/promotionsMail/promotionsMailApi";
import { useMarkMailAsSpamMutation } from "../../features/spamMail/spamMailApi";
import { useMarkTrashSingleInboxMailMutation } from "../../features/trashMail/trashMailApi";

interface props {
  setShowComponent: any;
  toggleButtonRef: any;
}

export default function MoveEmailOptionsDiv(props: props) {
  const { setShowComponent, toggleButtonRef } = props;
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
    for (let i = 0; i < selectedMails.length; i++){
      const mailId = selectedMails[i];
      markMailAsSocial({mailId})
    }
    // close this component after sending request
     setShowComponent(false);
 }

  const moveToPromotionHandler = () => {
    for (let i = 0; i < selectedMails.length; i++) {
      const mailId = selectedMails[i];
      markMailAsPromotion({ mailId });
    }
    // close this component after sending request
    setShowComponent(false);
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

  return (
    <div ref={thisCompRef} className={styles.main}>
      <div className={styles.title}>
        <p>Move to:</p>
      </div>

      <div className={styles.line1}></div>

      <div onClick={moveToSocialHandler}>
        <p>Social</p>
      </div>

      <div onClick={moveToPromotionHandler}>
        <p>Promotions</p>
      </div>

      <div className={styles.line2}></div>

      <div onClick={moveToSpamHandler}>
        <p>Spam</p>
      </div>

      <div onClick={moveToTrashHandler}>
        <p>Trash</p>
      </div>
    </div>
  );
}
