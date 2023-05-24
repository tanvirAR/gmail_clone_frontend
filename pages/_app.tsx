import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Header from "../Components/header/Header";
import Sidebar from "../Components/sidebar/Sidebar";

import MinimizedEmail from "../Components/homePage/MinimizedEmail";
import ConditionalComponent from "../Components/common/conditionalComponent/ConditionalComponent";

import { sidebarVisibleComponents } from "./type";

export default function App({ Component, pageProps }: AppProps) {
  const showSidebar: boolean = sidebarVisibleComponents.includes(Component.name);

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
          <ConditionalComponent />
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}
