import classes from "./Email_Attachment.module.css";
import { useSelector } from "react-redux";
import storeStateInterface from "../../../interface/Store.interface";
import { useDispatch } from "react-redux";
import { setAttachment } from "../../../features/UI/UISlice";
import { Line } from "rc-progress";
import { deleteFile } from "../../../utils/deleteFileFromFirebase";

interface props {
  closeAttachmentHandler: () => void;
}

export default function Email_Attachment(props: props) {
  const { closeAttachmentHandler } = props;

  const { attachment, attachmentUploadProgressBar } = useSelector(
    (store: storeStateInterface) => store.UI
  );

  if (attachment == null) {
    return null;
  } else {
    const { name, size } = attachment;
    const sizeInKb = Math.floor(parseInt(size) / 1024);

    return (
      <div className={classes.attachment_div}>
        <p>
          {name} <span>({sizeInKb}KB)</span>
        </p>
        <div className={classes.loadingBar}>
          {attachmentUploadProgressBar > 0 &&
            attachmentUploadProgressBar < 100 && (
              <Line
                percent={attachmentUploadProgressBar}
                strokeWidth={6}
                strokeLinecap="butt"
                trailWidth={6}
                trailColor="#D3D3D3"
                strokeColor="rgb(30, 172, 255)"
              />
            )}
        </div>
        <span
          onClick={closeAttachmentHandler}
          className={`material-symbols-outlined ${classes.close_icon}`}
        >
          close
        </span>
      </div>
    );
  }
}
