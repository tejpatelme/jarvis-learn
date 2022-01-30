import "./Library.css";
import { useUserData } from "../../context/userdata-context";
import { LoadingContainer, PlaylistDetails } from "../../components";

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
          {playlists.length !== 0 &&
            playlists.map((playlist) => {
              return <PlaylistDetails key={playlist._id} playlist={playlist} />;
            })}
        </div>
      </div>
    </LoadingContainer>
  );
}
