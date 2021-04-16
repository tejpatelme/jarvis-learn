import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="top-navigation">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <h1>
              <span>Learn</span>
            </h1>
          </Link>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <Link to="/">
                <span className="material-icons-round">home</span>
              </Link>
            </li>

            <li>
              <Link to="/library">
                <span className="material-icons-round">video_library</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
