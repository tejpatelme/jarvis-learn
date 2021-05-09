import "./PlaylistModal.css";
import { useState } from "react";
import { useUserData } from "../../context/userdata-context";
import { useToast } from "../../context/toast-context";

export default function PlaylistModal({ currentVideo }) {
  const { playlist, dispatch } = useUserData();
  const [input, setInput] = useState("");
  const { dispatch: toastDispatch } = useToast();

  const addNewPlaylist = () => {
    if (input === "" || input.trim() === "") {
      toastDispatch({
        TYPE: "ERROR",
        PAYLOAD: {
          message: "Playlist name cannot be empty",
        },
      });
      setInput("");
      return;
    }

    dispatch({ TYPE: "ADD_NEW_PLAYLIST", PAYLOAD: input });
    setInput("");
  };

  const handlePlaylist = (currentPlaylist, currentVideo) => {
    const match = currentPlaylist.videos.find(
      (video) => video.id === currentVideo.id
    );
    if (match) {
      dispatch({
        TYPE: "REMOVE_VIDEO_FROM_PLAYLIST",
        PAYLOAD: {
          playlistId: currentPlaylist.id,
          videoId: currentVideo.id,
        },
      });
      toastDispatch({
        TYPE: "ERROR",
        PAYLOAD: {
          message: "Removed from playlist",
        },
      });
      return;
    }

    dispatch({
      TYPE: "ADD_VIDEO_TO_PLAYLIST",
      PAYLOAD: {
        playlistId: currentPlaylist.id,
        video: currentVideo,
      },
    });
    toastDispatch({
      TYPE: "SUCCESS",
      PAYLOAD: {
        message: "Added to playlist",
      },
      autoCloseInterval: 2000,
    });
  };
  return (
    <div onClick={(e) => e.stopPropagation()} className="playlist-modal">
      <ul>
        {playlist.map((currentPlaylist, idx) => {
          const match = currentPlaylist.videos.find(
            (video) => video.id === currentVideo.id
          );
          return (
            <li key={idx}>
              <label>
                <input
                  checked={match ? true : false}
                  onChange={() => handlePlaylist(currentPlaylist, currentVideo)}
                  type="checkbox"
                  className="mr-2"
                />
                {currentPlaylist.name}
              </label>
            </li>
          );
        })}
      </ul>
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Create a new playlist"
        />
        <button onClick={() => addNewPlaylist()}>
          <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
            <path
              d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
