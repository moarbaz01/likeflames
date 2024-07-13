import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./context/useTheme.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
import { SignupContextProvider } from "./context/useSignup";
import { PeerContextProvider } from "./context/usePeer";
import { SocketsContextProvider } from "./context/useSockets.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SocketsContextProvider>
          <PeerContextProvider>
            <SignupContextProvider>
              <ThemeContextProvider>
                  <App />
              </ThemeContextProvider>
            </SignupContextProvider>
          </PeerContextProvider>
        </SocketsContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
