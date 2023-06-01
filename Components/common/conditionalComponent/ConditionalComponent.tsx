import { useSelector } from "react-redux";
import EmailSendPopup from "../EmailSendPopup/EmailSendPopup";
import EmailSendPopupFullScreen from "../EmailSendPopup/EmailSendPopupFullScreen";
import AttachmentView from "../EmailAttachment/AttachmentView";
import { EmailSendPopUpError } from "../Error/EmailSendPopUpError";
import SentScheduleSentTimeSelect from "../TimeSelect/ScheduleSentMailTimeSelectComponent";
import SentMailAlert from "../Alert/SentMailAlert";
import SnoozedMailTimeSelect from "../TimeSelect/SnoozedMailDateTimeSelect";
import storeStateInterface from "../../../interface/Store.interface";

const ConditionalComponent = () => {
  const {
    scheduledSentTimeSelectComponent,
    snoozedMailTimeSelectComponent,
    sentEmailErrorPopUpToggled,
    attachmentView,
    isSendingMailLoading,
  } = useSelector((state: storeStateInterface) => state.UI);

  return (
    <div>
      {isSendingMailLoading.isComponentVisible && <SentMailAlert />}
      <EmailSendPopup />
      <EmailSendPopupFullScreen />
      {attachmentView.isVisible && <AttachmentView />}
      {sentEmailErrorPopUpToggled && <EmailSendPopUpError />}
      {snoozedMailTimeSelectComponent && <SnoozedMailTimeSelect />}
      {scheduledSentTimeSelectComponent && <SentScheduleSentTimeSelect />}
    </div>
  );
};

export default ConditionalComponent;
