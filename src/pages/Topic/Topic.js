import "./Topic.css";
import { VideoCard } from "../../components";
import { useParams } from "react-router";
import { useUserData } from "../../context/userdata-context";

export default function Topic() {
  const { topicName } = useParams();
  const { videos } = useUserData();
  return (
    <div>
      <h2 className="mt-5 mb-2 pl-3 topic-name">{topicName}</h2>
      <div className="video-container">
        {videos
          .filter((videos) => videos.topic === topicName)
          .map((video, idx) => (
            <VideoCard key={idx} videoDetails={video} />
          ))}
      </div>
    </div>
  );
}
