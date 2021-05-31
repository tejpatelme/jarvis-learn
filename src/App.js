import "./App.css";
import { useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar, ToastContainer } from "./components";
import {
  Home,
  Video,
  Library,
  Topic,
  Playlist,
  Liked,
  Login,
  Signup,
} from "./pages";
import API from "./api/api-urls";
import axios from "axios";
import { useUserData } from "./context/userdata-context";
import { useAuth } from "./context/auth-context";

function App() {
  const { dispatch } = useUserData();
  const { isLoggedIn } = useAuth();

  const fetchVideos = useCallback(async () => {
    try {
      const videos = await axios.get(API.FETCH_VIDEOS_URL);
      const videoLib = videos.data.map((video) => {
        const { _id: id, ...rest } = video;
        return {
          id,
          ...rest,
        };
      });

      dispatch({ type: "SET_VIDEOS", payload: { videos: videoLib } });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API.BASE_URL}/playlists`);

        dispatch({ type: "SET_PLAYLISTS", payload: { playlists: data } });
      } catch (err) {
        console.log(err.response);
      }
    })();
  }, [dispatch, isLoggedIn]);

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
