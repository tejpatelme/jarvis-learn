import { VideoCard } from "../../components";
import { videoLib } from "../../data/data";
import { useParams } from "react-router";

export default function Topic() {
  const { topicName } = useParams();
  return (
    <>
      <h2 className="mt-5 mb-2 pl-3">{topicName}</h2>
      <div className="video-container">
        {videoLib
          .filter((videos) => videos.topic === topicName)
          .map((video, idx) => (
            <VideoCard key={idx} videoDetails={video} />
          ))}
      </div>
    </>
  );
}
