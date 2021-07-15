import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import UserDataProvider from "./context/userdata-context";
import ToastProvider from "./context/toast-context";
import AuthProvider from "./context/auth-context";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <UserDataProvider>
        <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </UserDataProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
