import axios from "axios";
import API from "./api-urls";
import { axiosWithTryCatch } from "./axios-executer";

export const fetchAllVideos = async (dispatch, toastDispatch) => {
  const data = await axiosWithTryCatch(
    () => axios.get(API.FETCH_VIDEOS_URL),
    toastDispatch
  );

  if (data?.success) {
    dispatch({ type: "SET_VIDEOS", payload: { videos: data.videos } });
  }
};
