// import Options from "./Options";
// import EmailSection from "./EmailSection";
// import styles from "./RightSideContainer.module.css";
// // import EmailList from "./EmailList";
// import EmailSendPopup from "./EmailSendPopup";
// import EmailSendPopupFullScreen from "./EmailSendPopupFullScreen";
// import { useSelector } from "react-redux";
// import MinimizedEmail from "./MinimizedEmail";
// import storeStateInterface from "../../interface/Store.interface";

// export default function RightContainer() {
//   const { sentBoxSmallScreen, sentBoxLargeScreen } = useSelector(
//     (state: storeStateInterface) => state.UI
//   );

//   return (
//     <div style={{ borderRadius: "20px" }} className={styles["emailList"]}>
//       <div>
//         <Options />

//         <EmailSection />
//         {/* <EmailList /> */}
//         {/* {sentBoxSmallScreen && <EmailSendPopup />} */}
//         {/* <EmailSendPopupFullScreen /> */}
//       </div>
//       <div className={styles.minimizedEmailList}>
//         <MinimizedEmail />
//         {/* <MinimizedEmail />
//         <MinimizedEmail />
//         <MinimizedEmail /> */}
//       </div>
//     </div>
//   );
// }
