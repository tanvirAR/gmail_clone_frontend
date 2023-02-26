import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import RightContainer from "../components/HomePage/RightContainer";
import classes from "./Inbox.module.css"

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

