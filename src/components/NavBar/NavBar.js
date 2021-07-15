import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar({ setShowSidebar }) {
  const onHamburgerClick = (e) => {
    e.stopPropagation();
    setShowSidebar((showSidebar) => !showSidebar);
  };

  return (
    <header className="top-navigation">
      <div className="nav-container">
        <span
          onClick={onHamburgerClick}
          className="material-icons-round icon-gray"
        >
          menu
        </span>
        <Link to="/">
          <span className="logo">JARVIS•LEARN</span>
        </Link>
        <div className="nav-links">
          <ul>
            <div></div>
          </ul>
        </div>
      </div>
    </header>
  );
}
