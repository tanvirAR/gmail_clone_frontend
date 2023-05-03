import Image from "next/image";
import close_icon from "../../assets/close_icon_attachment.svg";
import classes from "./Email_Attachment.module.css";
import { useSelector } from "react-redux";
import storeStateInterface from "../../interface/Store.interface";
import { useDispatch } from "react-redux";
import { setAttachment } from "../../features/UI/UISlice";
import { useState } from "react";
import { Line } from "rc-progress"; 
import { deleteFile } from "../../utils/deleteFileFromFirebase";

export default function Email_Attachment() {
  const {attachment, attachmentUploadProgressBar} = useSelector((store: storeStateInterface) => store.UI)
  const dispatch = useDispatch()


 const closeAttchmentHandler = () => {
  localStorage.removeItem('image');
  if(attachment?.name){
    // delete file from firebase
  deleteFile(attachment?.name);
  }
  dispatch(setAttachment(null))
  
 }

 

  if(attachment == null){
    return null;
  } else {

    const {name, size} = attachment;
    const sizeInKb = Math.floor(parseInt(size) / 1024)
  
  return (
    <div className={classes.attachment_div}>
      <p>
        {name} <span>({sizeInKb}KB)</span>
      </p>
      <div className={classes.loadingBar}>
       {(attachmentUploadProgressBar > 0 && attachmentUploadProgressBar < 100) && <Line
          percent={attachmentUploadProgressBar}
          strokeWidth={6}
          strokeLinecap="butt"
          trailWidth={6}
          trailColor="#D3D3D3"
          strokeColor="rgb(30, 172, 255)"
        />}
      </div>
      <span
        onClick={closeAttchmentHandler}
        className={`material-symbols-outlined ${classes.close_icon}`}
      >
        close
      </span>
    </div>
  );
}
}
