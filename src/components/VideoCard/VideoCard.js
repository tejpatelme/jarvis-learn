import { Link } from "react-router-dom";
import "./VideoCard.css";

export default function VideoCard({ videoDetails }) {
  const { videoId, imageURL, name, channelName, channelLogoURL } = videoDetails;
  return (
    <Link to={`/video/${videoId}`}>
      <div className="video-card relative">
        <img
          width="300px"
          height="150px"
          className="img-res video__image"
          src={imageURL}
          alt="video-thumbnail"
          loading="lazy"
        />
        <p className="video__title">{name}</p>
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
    </Link>
  );
}
