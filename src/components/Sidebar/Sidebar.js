import "./Sidebar.css";
import { SidebarNavlink } from "../";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../../context/toast-context";
import { useNavigate } from "react-router-dom";

export default function SideBar({ showSidebar, setShowSidebar }) {
  const { isLoggedIn, logOutUser } = useAuth();
  const { dispatch: toastDispatch } = useToast();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    toastDispatch({
      type: "SUCCESS",
      payload: { message: "Logout Successful" },
    });
    logOutUser();
  };

  const onLoginClick = () => {
    setShowSidebar(false);
    navigate("/login");
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`sidebar ${showSidebar ? "show-sidebar" : "hide-sidebar"}`}
    >
      <span className="logo">JARVIS•LEARN</span>
      <button onClick={() => setShowSidebar(false)} className="btn">
        <span className="material-icons-round icon-gray close-icon">close</span>
      </button>
      <div className="links-container">
        <div className="space-y-2">
          <SidebarNavlink icon="home" link="/" title="Home" />
          <SidebarNavlink icon="video_library" link="library" title="Library" />
          {isLoggedIn && (
            <SidebarNavlink icon="person" link={`profile`} title="Profile" />
          )}
          {!isLoggedIn && (
            <button onClick={onLoginClick} className="btn sidebar-button">
              <span className="material-icons-round icon-md icon-gray">
                login
              </span>
              <span className="ml-2">Login</span>
            </button>
          )}
        </div>
        {isLoggedIn && (
          <button onClick={onLogoutClick} className="btn sidebar-button">
            <span className="material-icons-round icon-md icon-gray">
              logout
            </span>
            <span className="ml-2">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}
