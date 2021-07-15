import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar, Sidebar, ToastContainer } from "./components";
import PrivateRoute from "./auth/PrivateRoute";
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
import { useUserData } from "./context/userdata-context";
import { useAuth } from "./context/auth-context";
import { fetchAllVideos } from "./services/api/video-requests";
import { useToast } from "./context/toast-context";
import { fetchUsersPlaylists } from "./services/api/playlist-requests";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { dispatch } = useUserData();
  const { isLoggedIn, setup401Interceptor } = useAuth();
  const { dispatch: toastDispatch } = useToast();

  useEffect(() => {
    (async () => {
      fetchAllVideos(dispatch, toastDispatch);
      setup401Interceptor();
    })();
  }, []);

  useEffect(() => {
    (async () => fetchUsersPlaylists(isLoggedIn, dispatch, toastDispatch))();
  }, [isLoggedIn]);

  return (
    <div onClick={() => setShowSidebar(false)} className="App">
      <ToastContainer />
      {showSidebar && <div className="sidebar-bg"></div>}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <div className="view-container">
              <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
              <NavBar setShowSidebar={setShowSidebar} />
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/topic/:topicName" element={<Topic />} />
                <Route path="liked" element={<Liked />} />

                <PrivateRoute path="/library" element={<Library />} />
                <PrivateRoute
                  path="/playlist/:playlistName"
                  element={<Playlist />}
                />
              </Routes>
            </div>
          }
        />
        <Route path="/video/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
}

export default App;
