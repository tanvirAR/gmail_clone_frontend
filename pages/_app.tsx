import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Header from "../Components/header/Header";
import Sidebar from "../Components/sidebar/Sidebar";
import { SentMailAlert } from "../Components/common/SentMailAlert";
import EmailSendPopupFullScreen from "../Components/homePage/EmailSendPopupFullScreen";
import EmailSendPopup from "../Components/homePage/EmailSendPopup";
import AttachmentView from "../Components/common/AttachmentView";
import Inbox from "./mail/u/[id]/inbox/index";
import SingleMail from "./mail/u/[id]/inbox/[mailId]";
import TrashPage from "./mail/u/[id]/trash";
import SentPage from "./mail/u/[id]/sent";
import StarredPage from "./mail/u/[id]/starred";
import ImportantMailPage from "./mail/u/[id]/important";
import SpamPage from "./mail/u/[id]/spam";
import MinimizedEmail from "../Components/homePage/MinimizedEmail";
import { EmailSendPopUpError } from "../Components/common/EmailSendPopUpError";

export default function App({ Component, pageProps }: AppProps) {
  const showSidebar =
    Component === Inbox ||
    Component === SingleMail ||
    Component === TrashPage ||
    Component === SentPage ||
    Component === StarredPage ||
    Component === SpamPage ||
    Component === ImportantMailPage;
  return (
    <Provider store={store}>
      {showSidebar ? (
        <>
          <Header />
          <div
            style={{
              display: "flex",
              position: "relative",
              height: "100vh",
              background: "#f6f8fc",
            }}
          >
            <Sidebar />
            <Component {...pageProps} />
            <MinimizedEmail />
          </div>
          <SentMailAlert />
          <EmailSendPopup />
          <EmailSendPopupFullScreen />
          <AttachmentView />
          <EmailSendPopUpError />
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}
