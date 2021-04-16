import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NavBar, ToastContainer } from "./components";
import { Home, Video, Library, Topic } from "./pages";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<Video />} />
        <Route path="/topic/:topicName" element={<Topic />} />
        <Route path="/library" element={<Library />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
