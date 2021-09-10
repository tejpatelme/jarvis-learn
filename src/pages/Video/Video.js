import { useState } from "react";
import { useParams } from "react-router";
import "./Video.css";
import { useUserData } from "../../context/userdata-context";
import { ModalBg, PlaylistModal } from "../../components";
import { addVideoToPlaylist } from "../../services/api/playlist-requests";
import { useToast } from "../../context/toast-context";
import { useAuth } from "../../context/auth-context";

export default function Video() {
  const { videoId } = useParams();
  const { playlists, dispatch } = useUserData();
  const { dispatch: toastDispatch } = useToast();
  const { isLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { videos } = useUserData();
  const videosEmpty = videos.length === 0;
  const currentVideo = videos.find((video) => video.videoId === videoId);
  const likedVideos = playlists.find(
    (playlist) => playlist.name === "Liked Videos"
  );
  const videoInLiked = likedVideos?.videos.find(
    (video) => video._id === currentVideo._id
  );

  const handleLike = () => {
    if (isLoggedIn === false) {
      return toastDispatch({
        type: "INFO",
        payload: { message: "Login to like videos" },
      });
    }

    addVideoToPlaylist({
      playlistId: likedVideos._id,
      currentVideo,
      dispatch,
      toastDispatch,
    });
  };

  const handlePlaylistClicked = () => {
    if (isLoggedIn === false) {
      return toastDispatch({
        type: "INFO",
        payload: { message: "Login to manage playlists" },
      });
    }

    setShowModal((showModal) => !showModal);
  };

  return (
    <div>
      {videosEmpty ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="video-player-container">
            <iframe
              className="youtube-player"
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-details">
            <p className="video-title">{currentVideo.name}</p>
            <p className="video-description">{currentVideo.description}</p>
            <div className="extra-details mb-5">
              <div className="channel-details">
                <div className="avatar avatar-lg mr-2">
                  <img
                    src={currentVideo.channelLogoURL}
                    className="img-round"
                    alt="channel-logo"
                  />
                </div>
                <span className="channel-name">{currentVideo.channelName}</span>
              </div>
              <div>
                <button className="mr-3" onClick={() => handleLike()}>
                  {videoInLiked ? (
                    <span className="material-icons">favorite</span>
                  ) : (
                    <span className="material-icons">favorite_border</span>
                  )}
                </button>
                <button onClick={handlePlaylistClicked}>
                  <span className="material-icons">playlist_add</span>
                </button>
              </div>
            </div>
          </div>
          {showModal && (
            <ModalBg setShowModal={setShowModal}>
              <PlaylistModal currentVideo={currentVideo} />
            </ModalBg>
          )}
        </>
      )}
    </div>
  );
}
