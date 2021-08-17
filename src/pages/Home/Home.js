import "./Home.css";
import { LoadingContainer, TopicCard, VideoCard } from "../../components";
import { useUserData } from "../../context/userdata-context";
import { topics } from "../../data/data";

export default function Home() {
  const { videos } = useUserData();

  const figmaVideos = videos
    .filter((video) => video.topic === "Figma Basics")
    .slice(0, 3);
  const fundamentalsVideos = videos
    .filter((video) => video.topic === "Design Fundamentals")
    .slice(0, 3);
  const materialVideos = videos
    .filter((video) => video.topic === "Material Design")
    .slice(0, 3);
  const colorVideos = videos
    .filter((video) => video.topic === "Color Theory")
    .slice(0, 3);

  const explore = [
    ...figmaVideos,
    ...fundamentalsVideos,
    ...materialVideos,
    ...colorVideos,
  ];

  const lengthIsZero = videos.length === 0;

  return (
    <div className="home-container">
      <h2 className="mt-5 mb-2 pl-3">Topics</h2>
      <div className={`topic-card-container ${lengthIsZero ? "disabled" : ""}`}>
        {topics.map((topic, idx) => (
          <TopicCard key={idx} topic={topic} />
        ))}
      </div>

      <h2 className="mt-5 mb-2 pl-3">Explore </h2>
      <LoadingContainer loading={lengthIsZero}>
        <div className="video-container">
          {explore.map((video, idx) => (
            <VideoCard key={idx} videoDetails={video} />
          ))}
        </div>
      </LoadingContainer>
    </div>
  );
}
