import axios from "axios";
import API from "./api-urls";
import { axiosWithTryCatch } from "./axios-executer";

export const fetchUsersPlaylists = async (
  isLoggedIn,
  dispatch,
  toastDispatch
) => {
  if (isLoggedIn) {
    const data = await axiosWithTryCatch(
      () => axios.get(`${API.BASE_URL}/playlists`),
      toastDispatch
    );

    if (data?.success) {
      dispatch({
        type: "SET_PLAYLISTS",
        payload: { playlists: data?.userPlaylists },
      });
    }
  } else dispatch({ type: "SET_PLAYLISTS", payload: { playlists: [] } });
};

export const addNewPlaylist = async (body, dispatch, toastDispatch) => {
  const data = await axiosWithTryCatch(() =>
    axios.post(`${API.BASE_URL}/playlists/new`, body)
  );

  if (data?.success) {
    toastDispatch({
      type: "SUCCESS",
      payload: {
        message: "Playlist created successfully",
      },
    });

    dispatch({
      type: "ADD_NEW_PLAYLIST",
      payload: { _id: data.newPlaylist._id, name: data.newPlaylist.name },
    });
  }
};

export const addVideoToPlaylist = async (options) => {
  const { playlistId, currentVideo, dispatch, toastDispatch } = options;

  const data = await axiosWithTryCatch(
    () =>
      axios.post(`${API.BASE_URL}/playlists/${playlistId}`, {
        videoId: currentVideo._id,
      }),
    toastDispatch
  );

  if (data?.success) {
    dispatch({
      type: "HANDLE_VIDEO_IN_PLAYLIST",
      payload: {
        updatedPlaylist: data?.updatedPlaylist,
      },
    });
  }
};
