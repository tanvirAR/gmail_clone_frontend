import Image from "next/image";
import close_icon from "../../../../../assets/close_icon_attachment.svg";
import classes from "../../../../../styles/inboxPage/Email_Attachment.module.css"

export default function Email_Attachment() {
  return (
    <div className={classes.attachment_div}>
      <p>The First Attachment <span>(36kb)</span></p>

      <Image className={classes.close_attachment} src={close_icon} alt="" />
    </div>
  );
}
