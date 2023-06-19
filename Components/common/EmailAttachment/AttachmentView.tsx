import Image from "next/image";
import classes from "./AttachmentView.module.css";
import { useDispatch } from "react-redux";
import { setAttachmentView } from "../../../features/UI/UISlice";
import { useSelector } from "react-redux";
import storeInterface from "../../../interface/Store.interface"

const AttachmentView = () => {
  const dispatch = useDispatch();

  const { isVisible, url } = useSelector((state: storeInterface) => state.UI.attachmentView)

  const closeAttachmentViewHandler = (e: React.MouseEvent<HTMLDivElement>) => {
  
    dispatch(setAttachmentView({isVisible: false, url: ''}))
  }

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

 


  return (
    <div onClick={closeAttachmentViewHandler} className={classes.sent_box}>
      <div  onClick={handleDivClick} className={classes.innerBox}>
        <Image
          alt=""
          fill
          priority
          draggable={false}
          src={
            url
          }
          style={{ objectFit: "contain", userSelect: "none", pointerEvents: 'none'}}
            sizes="(min-width: 200px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export default AttachmentView;
