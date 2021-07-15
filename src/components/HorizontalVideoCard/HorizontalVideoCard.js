import { Link } from "react-router-dom";
import "./HorizontalVideoCard.css";

export default function HorizontalVideoCard({ videoDetails }) {
  const { videoId, imageURL, name, description, channelName, channelLogoURL } =
    videoDetails;
  return (
    <Link to={`/video/${videoId}`}>
      <div className="horizontal-video-card">
        <img
          className="img-res video-image"
          src={imageURL}
          alt="video-thumbnail"
        />
        <div className="horizontal-video-details">
          <p className="video__title">{name}</p>
          <p className="horizontal-video-description">{description}</p>
          <div className="channel__details">
            <span>By</span>
            <img
              className="channel__image"
              src={channelLogoURL}
              alt="channel-logo"
            />
            {channelName}
          </div>
        </div>
      </div>
    </Link>
  );
}
