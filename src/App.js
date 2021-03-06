import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { NavBar, Sidebar, ToastContainer } from "./components";
import PrivateRoute from "./auth/PrivateRoute";
import {
  Home,
  Video,
  Library,
  Topic,
  Playlist,
  Login,
  Signup,
  Profile,
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
  const location = useLocation();

  useEffect(() => {
    (async () => {
      fetchAllVideos(dispatch, toastDispatch);
      setup401Interceptor();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => fetchUsersPlaylists(isLoggedIn, dispatch, toastDispatch))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => setShowSidebar(false), [location]);

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
            <>
              <NavBar setShowSidebar={setShowSidebar} />
              <div className="view-container">
                <Sidebar
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <PrivateRoute path="/profile" element={<Profile />} />
                  <Route path="/topic/:topicName" element={<Topic />} />

                  <PrivateRoute path="/library" element={<Library />} />
                  <PrivateRoute
                    path="/playlist/:playlistName"
                    element={<Playlist />}
                  />
                </Routes>
              </div>
            </>
          }
        />
        <Route path="/video/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
}

export default App;
