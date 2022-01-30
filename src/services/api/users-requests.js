import axios from "axios";
import API from "./api-urls";
import { axiosWithTryCatch } from "./axios-executer";

export const getUserDetails = async (toastDispatch) => {
  const data = await axiosWithTryCatch(
    () => axios.get(`${API.BASE_URL}/users`),
    toastDispatch
  );

  if (data?.success) {
    return data?.user;
  }
};
