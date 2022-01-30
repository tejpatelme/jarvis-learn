import { useState } from "react";
import { Link } from "react-router-dom";
import { Spinner, VideoCard } from "..";
import { useToast } from "../../context/toast-context";
import { useUserData } from "../../context/userdata-context";
import { deletePlaylist } from "../../services/api/playlist-requests";

export default function PlaylistDetails({ playlist }) {
  const [deletePlaylistStatus, setDeletePlaylistStatus] = useState("idle");
  const { dispatch: toastDispatch } = useToast();
  const { dispatch } = useUserData();

  const handleDeletePlaylist = async (playlist) => {
    if (playlist.name === "Liked Videos" || playlist.name === "Watch Later") {
      return toastDispatch({
        type: "ERROR",
        payload: { message: "Cannot delete default playlist" },
      });
    }

    setDeletePlaylistStatus("loading");
    await deletePlaylist(playlist._id, dispatch, toastDispatch);
  };

  return (
    <div>
      <div className="playlist-details">
        <div>
          <p className="playlist-name">{playlist.name}</p>
          <span>{playlist.videos.length} Videos</span>
        </div>
        <div className="flex">
          <button
            onClick={() => handleDeletePlaylist(playlist)}
            disabled={deletePlaylistStatus === "loading"}
            className="btn mr-3"
          >
            {deletePlaylistStatus === "loading" ? (
              <Spinner color="white" />
            ) : (
              <span
                style={{
                  color: "black",
                }}
                className="material-icons-round"
              >
                delete
              </span>
            )}
          </button>
          <Link to={`/playlist/${playlist.name}`}>
            <button
              className="btn btn-xs"
              disabled={playlist.videos.length === 0 ? true : false}
            >
              SEE ALL
            </button>
          </Link>
        </div>
      </div>
      <div className="playlist-videos">
        {playlist.videos.slice(0, 5).map((video, idx) => (
          <VideoCard key={idx} videoDetails={video} />
        ))}
      </div>
    </div>
  );
}
