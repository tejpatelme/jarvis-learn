import axios from "axios";
import { createContext, useContext, useState } from "react";
import API from "../api/api-urls";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { token: userToken } = JSON.parse(localStorage.getItem("login")) || {
    token: null,
  };

  const [loginInfo, setLoginInfo] = useState({
    isLoggedIn: userToken ? true : false,
    token: userToken,
  });

  const { isLoggedIn, token } = loginInfo;

  const setupHeaderForServiceCalls = () => {
    if (isLoggedIn && token) {
      return (axios.defaults.headers.common["Authorization"] = token);
    }

    delete axios.defaults.headers.common["Authorization"];
  };

  setupHeaderForServiceCalls();

  const signUpUser = async ({ name, email, password }) => {
    try {
      const {
        data: { success },
      } = axios.post(`${API.BASE_URL}/users/signup`, {
        name,
        email,
        password,
      });

      if (success === "true") {
        return success;
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const logInUser = async (email, password) => {
    try {
      const { data } = await axios.post(`${API.BASE_URL}/users/login`, {
        email,
        password,
      });

      if (data?.success) {
        localStorage.setItem("login", JSON.stringify({ token: data?.token }));
        setLoginInfo({
          isLoggedIn: true,
          token: data.token,
        });

        return data?.success;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("login");
    setLoginInfo({
      isLoggedIn: false,
      token: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, signUpUser, logInUser, logOutUser, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
