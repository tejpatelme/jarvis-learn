import { TopicCard, VideoCard } from "../../components";
import { videoLib, topics } from "../../data/data";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <h2 className="mt-5 mb-2 pl-3">Topics</h2>
      <div className="topic-card-container">
        {topics.map((topic, idx) => (
          <TopicCard key={idx} topic={topic} />
        ))}
      </div>

      <h2 className="mt-5 mb-2 pl-3">Explore </h2>
      <div className="video-container">
        {videoLib.map((video, idx) => (
          <VideoCard key={idx} videoDetails={video} />
        ))}
      </div>
    </div>
  );
}
