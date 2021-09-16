import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import UserDataProvider from "./context/userdata-context";
import ToastProvider from "./context/toast-context";
import AuthProvider from "./context/auth-context";
import ThemeProvider from "./context/theme-context";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <UserDataProvider>
          <Router>
            <AuthProvider>
              <App />
            </AuthProvider>
          </Router>
        </UserDataProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
