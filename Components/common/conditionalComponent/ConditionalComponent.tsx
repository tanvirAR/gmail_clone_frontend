import { useSelector } from "react-redux";
import EmailSendPopup from "../../homePage/EmailSendPopup";
import EmailSendPopupFullScreen from "../../homePage/EmailSendPopupFullScreen";
import AttachmentView from "../AttachmentView";
import { EmailSendPopUpError } from "../EmailSendPopUpError";
import SentScheduleSentTimeSelect from "../ScheduleSentMailTimeSelectComponent";
import { SentMailAlert } from "../SentMailAlert";
import SnoozedMailTimeSelect from "../SnoozedMailDateTimeSelect";
import storeStateInterface from "../../../interface/Store.interface";


const ConditionalComponent = () => {

    const {scheduledSentTimeSelectComponent, snoozedMailTimeSelectComponent} = useSelector((state: storeStateInterface) => state.UI)

  return (
    <div>
      <SentMailAlert />
      <EmailSendPopup />
      <EmailSendPopupFullScreen />
      <AttachmentView />
      <EmailSendPopUpError />
      {snoozedMailTimeSelectComponent && <SnoozedMailTimeSelect />}
      {scheduledSentTimeSelectComponent && <SentScheduleSentTimeSelect />}
    </div>
  );
}


export default ConditionalComponent;