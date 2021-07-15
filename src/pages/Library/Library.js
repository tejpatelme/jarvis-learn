import "./Library.css";
import { useUserData } from "../../context/userdata-context";
import { LoadingContainer, VideoCard } from "../../components";
import { Link } from "react-router-dom";

export default function Library() {
  const { playlists, videos } = useUserData();

  return (
    <LoadingContainer loading={videos.length === 0}>
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
          {playlists.map((playlist, idx) => {
            return (
              <div key={idx}>
                <div className="playlist-details">
                  <div>
                    <p className="playlist-name">{playlist.name}</p>
                    <span>{playlist.videos.length} Videos</span>
                  </div>
                  <Link replace to={`/playlist/${playlist.name}`}>
                    <button
                      className="btn btn-xs sbtn-primary"
                      disabled={playlist.videos.length === 0 ? true : false}
                    >
                      SEE ALL
                    </button>
                  </Link>
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
    </LoadingContainer>
  );
}
