import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useUserData } from "./context/userdata-context";
import { useAuth } from "./context/auth-context";
import { fetchAllVideos } from "./services/api/video-requests";
import { useToast } from "./context/toast-context";
import { fetchUsersPlaylists } from "./services/api/playlist-requests";

const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ "./pages/Home/Home")
);
const Video = lazy(() =>
  import(/* webpackChunkName: "video" */ "./pages/Video/Video")
);
const Library = lazy(() =>
  import(/* webpackChunkName: "library" */ "./pages/Library/Library")
);
const Topic = lazy(() =>
  import(/* webpackChunkName: "topic" */ "./pages/Topic/Topic")
);
const Playlist = lazy(() =>
  import(/* webpackChunkName: "playlist" */ "./pages/Playlist/Playlist")
);
const Login = lazy(() =>
  import(/* webpackChunkName: "login" */ "./pages/Login/Login")
);
const Signup = lazy(() =>
  import(/* webpackChunkName: "signup" */ "./pages/Signup/Signup")
);
const Profile = lazy(() =>
  import(/* webpackChunkName: "profile" */ "./pages/Profile/Profile")
);
const NavBar = lazy(() =>
  import(/* webpackChunkName: "navbar" */ "./components/NavBar/NavBar")
);
const Sidebar = lazy(() =>
  import(/* webpackChunkName: "sidebar" */ "./components/Sidebar/Sidebar")
);
const ToastContainer = lazy(() =>
  import(
    /* webpackChunkName: "toast-container" */ "./components/Toast/ToastContainer"
  )
);
const PrivateRoute = lazy(() =>
  import(/* webpackChunkName: "private-route" */ "./auth/PrivateRoute")
);

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
      <Suspense fallback={() => <div>Loading....</div>}>
        <ToastContainer />
        {showSidebar && <div className="sidebar-bg"></div>}
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={() => <div>Loading....</div>}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={() => <div>Loading....</div>}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <NavBar setShowSidebar={setShowSidebar} />
                <div className="view-container">
                  <Sidebar
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                  />

                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Suspense fallback={() => <div>Loading....</div>}>
                          <Home />
                        </Suspense>
                      }
                    />
                    <PrivateRoute
                      path="/profile"
                      element={
                        <Suspense fallback={() => <div>Loading....</div>}>
                          <Profile />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/topic/:topicName"
                      element={
                        <Suspense fallback={() => <div>Loading....</div>}>
                          <Topic />
                        </Suspense>
                      }
                    />
                    <PrivateRoute
                      path="/library"
                      element={
                        <Suspense fallback={() => <div>Loading....</div>}>
                          <Library />
                        </Suspense>
                      }
                    />
                    <PrivateRoute
                      path="/playlist/:playlistName"
                      element={
                        <Suspense fallback={() => <div>Loading....</div>}>
                          <Playlist />
                        </Suspense>
                      }
                    />
                  </Routes>
                </div>
              </>
            }
          />
          <Route path="/video/:videoId" element={<Video />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
