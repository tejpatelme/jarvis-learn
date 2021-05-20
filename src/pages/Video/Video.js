import { useState } from "react";
import { useParams } from "react-router";
import { videoLib } from "../../data/data";
import "./Video.css";
import { useUserData } from "../../context/userdata-context";
import { ModalBg, PlaylistModal } from "../../components";

export default function Video() {
  const { videoId } = useParams();
  const { liked, dispatch } = useUserData();
  const [showModal, setShowModal] = useState(false);

  const currentVideo = videoLib.find((video) => video.id === videoId);

  const handleLike = (id) => {
    const match = liked.find((video) => video.id === id);
    if (match) {
      dispatch({ type: "REMOVE_FROM_LIKED", payload: id });
      return;
    }

    dispatch({ type: "ADD_TO_LIKED", payload: currentVideo });
  };

  return (
    <div>
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
                src={currentVideo.channelLogo}
                className="img-round"
                alt="channel-logo"
              />
            </div>
            <span className="channel-name">{currentVideo.channelName}</span>
          </div>
          <div>
            <button
              className="mr-3"
              onClick={() => handleLike(currentVideo.id)}
            >
              {liked.find((video) => video.id === currentVideo.id) ? (
                <span className="material-icons">favorite</span>
              ) : (
                <span className="material-icons">favorite_border</span>
              )}
            </button>
            <button onClick={() => setShowModal((showModal) => !showModal)}>
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
    </div>
  );
}
