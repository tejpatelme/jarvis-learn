import "./Playlist.css";
import { useParams } from "react-router";
import { HorizontalVideoCard } from "../../components";
import { useUserData } from "../../context/userdata-context";

export default function Playlist() {
  const { playlistName } = useParams();
  const { playlists } = useUserData();

  const { videos } = playlists.find(
    (playlist) => playlist.name === playlistName
  );
  return (
    <div>
      <h2 className="mt-5 mb-2 pl-3 playlist-name">{playlistName}</h2>
      <div>
        {videos.map((video, idx) => (
          <HorizontalVideoCard key={idx} videoDetails={video} />
        ))}
      </div>
    </div>
  );
}
