import "./PlaylistModal.css";
import { useState } from "react";
import { useUserData } from "../../context/userdata-context";
import { useToast } from "../../context/toast-context";
import {
  addNewPlaylist,
  addVideoToPlaylist,
} from "../../services/api/playlist-requests";
import { Spinner } from "..";

export default function PlaylistModal({ currentVideo }) {
  const [addNewPlaylistStatus, setAddNewPlaylistStatus] = useState("idle");
  const [addToPlaylistStatus, setAddToPlaylistStatus] = useState("idle");
  const { playlists, dispatch } = useUserData();
  const [input, setInput] = useState("");
  const { dispatch: toastDispatch } = useToast();

  const checkEmptyString = () => {
    if (input === "" || input.trim() === "") {
      toastDispatch({
        type: "ERROR",
        payload: {
          message: "Playlist name cannot be empty",
        },
      });
      setInput("");
      return true;
    }
    return false;
  };

  const handleAddNewPlaylist = async () => {
    if (checkEmptyString()) {
      return;
    }

    setAddNewPlaylistStatus("loading");
    await addNewPlaylist(
      {
        name: input,
      },
      dispatch,
      toastDispatch
    );
    setAddNewPlaylistStatus("fulfilled");

    setInput("");
  };

  const handlePlaylist = async (playlistId, currentVideo) => {
    setAddToPlaylistStatus("loading");
    await addVideoToPlaylist({
      playlistId,
      currentVideo,
      dispatch,
      toastDispatch,
    });
    setAddToPlaylistStatus("fulfilled");
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="playlist-modal">
      {addToPlaylistStatus === "loading" && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      <ul>
        {playlists.map((currentPlaylist, idx) => {
          const match = currentPlaylist.videos.find(
            (video) => video._id === currentVideo._id
          );
          return (
            <li key={idx}>
              <label>
                <input
                  checked={match ? true : false}
                  onChange={() =>
                    handlePlaylist(currentPlaylist._id, currentVideo)
                  }
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
        <button
          disabled={addNewPlaylistStatus === "loading"}
          onClick={handleAddNewPlaylist}
        >
          {addNewPlaylistStatus === "loading" ? (
            <Spinner />
          ) : (
            <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
              <path
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
