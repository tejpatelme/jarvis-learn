import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NavBar, ToastContainer } from "./components";
import { Home, Video, Library, Topic, Playlist, Liked } from "./pages";

function App() {
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
