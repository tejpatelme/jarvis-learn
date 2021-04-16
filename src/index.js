import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import UserDataProvider from "./context/userdata-context";
import ToastProvider from "./context/toast-context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserDataProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </UserDataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
