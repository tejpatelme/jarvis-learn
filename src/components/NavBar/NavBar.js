import "./NavBar.css";
import Logo from "../../assests/logo.svg";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/theme-context";

export default function NavBar({ setShowSidebar }) {
  const { currentTheme, changeTheme } = useTheme();

  const onHamburgerClick = (e) => {
    e.stopPropagation();
    setShowSidebar((showSidebar) => !showSidebar);
  };

  return (
    <header className="top-navigation">
      <div className="nav-container">
        <span
          onClick={onHamburgerClick}
          className="material-icons-round hamburger"
        >
          menu
        </span>
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="nav-links">
          <ul>
            <div
              onClick={() =>
                changeTheme(currentTheme === "dark" ? "light" : "dark")
              }
            >
              <span className="material-icons-outlined">
                {currentTheme === "light" ? "dark_mode" : "light_mode"}
              </span>
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
}
