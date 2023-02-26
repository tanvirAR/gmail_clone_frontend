import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showEmailSelectCategoryDiv } from "../../../../../features/UI/UISlice";
import styles from "../../../../../styles/inboxPage/Options.module.css";
import MoreOptions from "./MoreOptions";
import SelectMailByCategory from "./SelectMailByCategory";

export default function Options() {
  const dispatch = useDispatch();

  const { EmailCategorySelectContainer } = useSelector((state) => state.UI);

  // changing state to show/unshow selecting email category div
  const toggleEmailSelectCategoryDiv = () => {
    dispatch(showEmailSelectCategoryDiv(!EmailCategorySelectContainer));
  };

  // state for more email options 
  const [moreOptions, setMoreOptions] = useState(false)

  return (
    <div className={styles["emailList-settings"]}>
      <div className={styles["settings-left"]}>
        <div className={styles.selectAll_div}>
          <div className={styles.input}>
            <input type="checkbox" />
          </div>
          <button
            onBlur={() => dispatch(showEmailSelectCategoryDiv(false))}
            onClick={toggleEmailSelectCategoryDiv}
          >
            <span className={"material-icons"}>arrow_drop_down</span>
          </button>
        </div>

        <span className={"material-icons"}>refresh</span>
        <button onBlur={() => setMoreOptions(false)} onClick={() => setMoreOptions((prevState) => !prevState)}>
          <span className={"material-icons"}>more_vert</span>
        </button>
        {/* <div></div> */}
      </div>
      <div className={styles["settings-right"]}>
        <span className="material-icons">chevron_left</span>
        <span className="material-icons">chevron_right</span>
      </div>
      {EmailCategorySelectContainer && <SelectMailByCategory />}
     {moreOptions && <MoreOptions />}
    </div>
  );
}
