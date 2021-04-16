import "./Library.css";
import { useUserData } from "../../context/userdata-context";
import { VideoCard } from "../../components";

export default function Library() {
  const { playlist } = useUserData();

  return (
    <>
      <div className="library-container">
        <div className="page-title">
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24">
            <path
              d="M19 9H2v2h17V9m0-4H2v2h17V5M2 15h13v-2H2v2m15-2v6l5-3l-5-3z"
              fill="currentColor"
            ></path>
          </svg>
          Playlist
        </div>

        <div className="playlist-container">
          {playlist.map((playlist, idx) => {
            return (
              <div key={idx}>
                <div className="playlist-details">
                  <div>
                    <p className="playlist-name">{playlist.name}</p>
                    <span>{playlist.videos.length} Videos</span>
                  </div>
                  <button className="btn btn-xs btn-primary">SEE ALL</button>
                </div>
                <div className="playlist-videos">
                  {playlist.videos.slice(0, 5).map((video, idx) => (
                    <VideoCard key={idx} videoDetails={video} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
