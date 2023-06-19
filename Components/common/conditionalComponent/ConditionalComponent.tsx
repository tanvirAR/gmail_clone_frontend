import { useSelector } from "react-redux";
import EmailSendPopup from "../EmailSendPopup/EmailSendPopup";
import EmailSendPopupFullScreen from "../EmailSendPopup/EmailSendPopupFullScreen";
import AttachmentView from "../EmailAttachment/AttachmentView";
import { EmailSendPopUpError } from "../Error/EmailSendPopUpError";
import SentScheduleSentTimeSelect from "../TimeSelect/ScheduleSentMailTimeSelectComponent";
import SentMailAlert from "../Alert/SentMailAlert";
import SnoozedMailTimeSelect from "../TimeSelect/SnoozedMailDateTimeSelect";
import storeStateInterface from "../../../interface/Store.interface";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ConditionalComponent = () => {
  const router = useRouter();
  const {
UI, auth
  } = useSelector((state: storeStateInterface) => state);

  const {
    scheduledSentTimeSelectComponent,
    snoozedMailTimeSelectComponent,
    sentEmailErrorPopUpToggled,
    attachmentView,
    isSendingMailLoading,
    sentBoxLargeScreen,
    sentBoxSmallScreen,
  } = UI;

  /* this is the state for attachment file which is gonna be send with email */
  const [attachment, setAttachment] = useState<null | File>(null);

  const { user} = auth;

useEffect(() => {
  if (user===undefined) {
    router.push("/")
  }
}, [user])


  return (
    <div>
      {isSendingMailLoading.isComponentVisible && <SentMailAlert />}
     {sentBoxSmallScreen && <EmailSendPopup attachmentFile={attachment} setAttachmentFile={setAttachment} />}
     {sentBoxLargeScreen && <EmailSendPopupFullScreen
        attachmentFile={attachment}
        setAttachmentFile={setAttachment}
      />}
      {attachmentView.isVisible && <AttachmentView />}
      {sentEmailErrorPopUpToggled && <EmailSendPopUpError />}
      {snoozedMailTimeSelectComponent && <SnoozedMailTimeSelect />}
      {scheduledSentTimeSelectComponent && <SentScheduleSentTimeSelect />}
    </div>
  );
};

export default ConditionalComponent;
