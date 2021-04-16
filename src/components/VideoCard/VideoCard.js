import { Link } from "react-router-dom";
import "./VideoCard.css";

export default function VideoCard({ videoDetails }) {
  const { id, image, name, channelName, channelLogo } = videoDetails;
  return (
    <Link to={`/video/${id}`}>
      <div className="video-card relative">
        <div>
          <img
            className="img-res video__image"
            src={image}
            alt="video-thumbnail"
          />
          <span className="badge badge-text">4:52</span>
        </div>
        <p className="video__title">{name}</p>
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
    </Link>
  );
}
