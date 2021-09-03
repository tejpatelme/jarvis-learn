import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useToast } from "./toast-context";
import { useNavigate } from "react-router";
import API from "../services/api/api-urls";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { token: userToken } = JSON.parse(localStorage.getItem("login")) || {
    token: null,
  };

  const [loginInfo, setLoginInfo] = useState({
    isLoggedIn: userToken ? true : false,
    token: userToken,
  });
  const [loginStatus, setLoginStatus] = useState("idle");

  const { isLoggedIn, token } = loginInfo;
  const { dispatch: toastDispatch } = useToast();
  const navigate = useNavigate();

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
      } = await axios.post(`${API.BASE_URL}/users/signup`, {
        name,
        email,
        password,
      });

      if (success === true) {
        return success;
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const logInUser = async (email, password) => {
    setLoginStatus("loading");
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
        setLoginStatus("fulfilled");
        return data?.success;
      }
    } catch (err) {
      toastDispatch({
        type: "ERROR",
        payload: { message: "Invalid Credentials! Try again." },
      });
      setLoginStatus("rejected");
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("login");
    setLoginInfo({
      isLoggedIn: false,
      token: null,
    });
  };

  const setup401Interceptor = () => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.data?.errorType === "JWT") {
          toastDispatch({
            type: "ERROR",
            payload: { message: "Token expired, please login again" },
          });
          logOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        setup401Interceptor,
        loginStatus,
        isLoggedIn,
        signUpUser,
        logInUser,
        logOutUser,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
