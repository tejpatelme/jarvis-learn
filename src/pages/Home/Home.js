import { TopicCard, VideoCard } from "../../components";
import { videoLib, topics } from "../../data/data";
import "./Home.css";

export default function Home() {
  const figmaVideos = videoLib
    .filter((video) => video.topic === "Figma Basics")
    .slice(0, 3);
  const fundamentalsVideos = videoLib
    .filter((video) => video.topic === "Design Fundamentals")
    .slice(0, 3);
  const materialVideos = videoLib
    .filter((video) => video.topic === "Material Design")
    .slice(0, 3);
  const colorVideos = videoLib
    .filter((video) => video.topic === "Color Theory")
    .slice(0, 3);

  const explore = [
    ...figmaVideos,
    ...fundamentalsVideos,
    ...materialVideos,
    ...colorVideos,
  ];

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
        {explore.map((video, idx) => (
          <VideoCard key={idx} videoDetails={video} />
        ))}
      </div>
    </div>
  );
}
