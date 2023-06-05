import classes from "./MinimizedEmail.module.css";
import { useDispatch } from "react-redux";
import {
  sentEmailBoxLarge,
  sentEmailBoxSmall,
  sentEmailMinimizePopup,
} from "../../../features/UI/UISlice";
import { useSelector } from "react-redux";
import storeStateInterface from "../../../interface/Store.interface";

export default function MinimizedEmail() {
  const dispatch = useDispatch();

  const closeMinimizedPopup = () => {
    dispatch(sentEmailMinimizePopup(false));
  };

  const minimizeToFullScreen = () => {
    dispatch(sentEmailMinimizePopup(false));
    dispatch(sentEmailBoxLarge(true));
  };

  const minimizeToSmallScreen = () => {
    dispatch(sentEmailMinimizePopup(false));
    dispatch(sentEmailBoxSmall(true));
  };

  // control conditional rendering with on global state
  const { minimizeEmailPop } = useSelector(
    (state: storeStateInterface) => state.UI
  );
  if (!minimizeEmailPop) {
    return null;
  }
  return (
    <div className={classes.minimizeEmailContainer}>
      {/* <p>Hello World</p> */}
      <p>New Message</p>

      <div className={classes.close_minimize_options}>
        <span
          onClick={minimizeToSmallScreen}
          className={`material-icons ${classes.minimize}`}
        >
          minimize
        </span>

        <span
          onClick={minimizeToFullScreen}
          className="material-symbols-outlined"
        >
          open_in_full
        </span>
        <span
          onClick={closeMinimizedPopup}
          className="material-symbols-outlined"
        >
          close
        </span>
      </div>
    </div>
  );
}
