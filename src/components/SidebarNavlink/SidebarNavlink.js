import "./SidebarNavlink.css";
import { NavLink } from "react-router-dom";

export default function SidebarNavlink({ link, icon, title, setShowSidebar }) {
  return (
    <NavLink
      end
      onClick={() => setShowSidebar(false)}
      to={link}
      activeClassName="active-link"
      className="sidebar-navlink"
    >
      <span className="material-icons-round icon-md icon-gray">{icon}</span>
      <span className="link-title">{title}</span>
    </NavLink>
  );
}
