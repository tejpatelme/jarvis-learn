import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar, ToastContainer } from "./components";
import { Home, Video, Library, Topic, Playlist, Liked } from "./pages";
import API from "./api/api-urls";
import axios from "axios";
import { useUserData } from "./context/userdata-context";

function App() {
  const { dispatch } = useUserData();

  const fetchVideos = async () => {
    try {
      const videos = await axios.get(API.FETCH_VIDEOS_URL);
      const videoLib = videos.data.map((video) => {
        const { _id: id, ...rest } = video;
        return {
          id,
          ...rest,
        };
      });

      dispatch({ TYPE: "SET_VIDEOS", PAYLOAD: { videos: videoLib } });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<Video />} />
        <Route path="/topic/:topicName" element={<Topic />} />
        <Route path="/library" element={<Library />} />
        <Route path="/playlist/:playlistName" element={<Playlist />} />
        <Route path="liked" element={<Liked />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
