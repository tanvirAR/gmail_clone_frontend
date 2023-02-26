import Image from "next/image";
import classes from "./MinimizedEmail.module.css";
import open_in_full from "../../assets/open_in_full.svg";
import close_icon_2 from "../../assets/close_icon.svg";
import { useDispatch } from "react-redux";
import { sentEmailBoxLarge, sentEmailBoxSmall, sentEmailMinimizePopup } 
from "../../features/UI/UISlice";

export default function MinimizedEmail() {

  const dispatch = useDispatch()

  const closeMinimizedPopup = () => {
    dispatch(sentEmailMinimizePopup(false))
  }

  const minimizeToFullScreen = () => {
    dispatch(sentEmailMinimizePopup(false))
    dispatch(sentEmailBoxLarge(true))
  }

   const minimizeToSmallScreen = () => {
     dispatch(sentEmailMinimizePopup(false));
     dispatch(sentEmailBoxSmall(true));
   };


  return (
    <div className={classes.minimizeEmailContainer}>
      {/* <p>Hello World</p> */}
      <p>New Message</p>

      <div className={classes.close_minimize_options}>
        <span onClick={minimizeToSmallScreen} className={`material-icons ${classes.minimize}`}>minimize</span>
        <Image onClick={minimizeToFullScreen} className={classes.open_in_full} src={open_in_full} alt="" />
        <Image
        onClick={closeMinimizedPopup}
          className={classes.close_icon_2}
          src={close_icon_2}
          alt=""
        />
      </div>
    </div>
  );
}
