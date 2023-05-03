import Header from "../Components/header/Header";
import Sidebar from "../Components/sidebar/Sidebar";
import RightContainer from "../Components/homePage/RightContainer";

export default function Inbox() {
     const style = {
       display: "flex",
       height: "100vh",
       background: "#f6f8fc",
     };
  return (
    <>
      <Header />
      <div style={style}>
        <Sidebar />
        <RightContainer />
      </div>
    </>
  );
}
