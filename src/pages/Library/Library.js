import "./Library.css";
import { useUserData } from "../../context/userdata-context";
import { VideoCard } from "../../components";
import { Link } from "react-router-dom";

export default function Library() {
  const { liked, playlist } = useUserData();

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
          <div>
            <div className="playlist-details">
              <div>
                <p className="playlist-name">Liked</p>
                <span>{liked.length} Videos</span>
              </div>
              <Link replace to="/liked">
                <button
                  className="btn btn-xs sbtn-primary"
                  disabled={liked.length === 0 ? true : false}
                >
                  SEE ALL
                </button>
              </Link>
            </div>
            <div className="playlist-videos">
              {liked.slice(0, 5).map((video, idx) => (
                <VideoCard key={idx} videoDetails={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
