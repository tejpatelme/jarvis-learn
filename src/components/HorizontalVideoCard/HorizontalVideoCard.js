import { Link } from "react-router-dom";
import "./HorizontalVideoCard.css";

export default function HorizontalVideoCard({ videoDetails }) {
  const {
    id,
    image,
    name,
    description,
    channelName,
    channelLogo,
  } = videoDetails;
  return (
    <Link to={`/video/${id}`}>
      <div className="horizontal-video-card">
        <img
          className="img-res video-image"
          src={image}
          alt="video-thumbnail"
        />
        <div className="horizontal-video-details">
          <p className="video__title">{name}</p>
          <p className="horizontal-video-description">{description}</p>
          <div className="channel__details">
            <span>By</span>
            <img
              className="channel__image"
              src={channelLogo}
              alt="channel-logo"
            />
            {channelName}
          </div>
        </div>
      </div>
    </Link>
  );
}
