import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Header from "../Components/header/Header";
import Sidebar from "../Components/sidebar/Sidebar";

import MinimizedEmail from "../Components/common/EmailSendPopup/MinimizedEmail";
import ConditionalComponent from "../Components/common/conditionalComponent/ConditionalComponent";

import { sidebarVisibleComponents } from "../interface/pagesType";
import { useState } from "react";
import AuthCheck from "../auth/AuthCheck";
import InitialLoadingComponent from "../Components/common/Loader/InitialLoadingComponent";

import SignInPage from "./index";
import SignupPage from "./signup"

export default function App({ Component, pageProps }: AppProps) {
  const showSidebar: boolean = Component !== SignInPage && Component !== SignupPage
  const [loading, setLoading] = useState(true);


  return (
    <Provider store={store}>
      {showSidebar ? (
        <>
         {!loading && ( <><Header /><div
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
          </div></>)}
          <ConditionalComponent   />
        </>
      ) : (
        !loading && <Component {...pageProps} />
      )}
      {loading && <InitialLoadingComponent />}
      <AuthCheck setLoading={setLoading} />
    </Provider>
  );
}
