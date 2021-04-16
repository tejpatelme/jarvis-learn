import { Link } from "react-router-dom";
import "./TopicCard.css";

export default function TopicCard({
  topic: { name, image, videos, totalLength },
}) {
  return (
    <Link to={`/topic/${name}`}>
      <div className="topic-card">
        <img
          src={image}
          alt="card-background"
          className="topic-card-background"
        />
        <div className="topic-card-overlay">
          <div className="topic-details">
            <p className="topic-heading">{name}</p>
            <p className="topic-videos-info">
              {videos} videos • {totalLength} hours
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
