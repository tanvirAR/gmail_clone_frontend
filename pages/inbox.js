import Header from "../../../../components/mail/u/id/inboxPage/header";
import Sidebar from "../../../../components/mail/u/id/inboxPage/Sidebar";
import RightContainer from "../../../../components/mail/u/id/inboxPage/RightContainer";
import classes from "../../../../styles/inboxPage/Inbox.module.css"

export default function Inbox() {
  return (
    <>
      <Header />
      <div className={classes.main} >
        <Sidebar />
        <RightContainer />
      </div>
    </>
  );
}


// style={{ display: "flex", height: "100vh" }}

// .main {
//  display: flex;
//  height: 100vh;   
// }

