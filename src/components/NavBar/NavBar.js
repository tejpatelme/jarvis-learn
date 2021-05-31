import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export default function NavBar() {
  const { isLoggedIn, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => logOutUser();

  const handleSignup = () => navigate("/signup");

  const handleLogin = () => navigate("/login");

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
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-primary"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={handleSignup}
                    className="btn btn-sm btn-primary"
                  >
                    Sign Up
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogin}
                    className="btn btn-sm btn-secondary"
                  >
                    Login
                  </button>
                </li>
              </>
            )}

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
