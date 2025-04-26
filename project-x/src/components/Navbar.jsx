import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    const firstName = parts[0] || "";
    const lastName = parts[1] || "";
    return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Pharmacy</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Store">Store</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/SelectAppointment">E-Channeling</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Contact">Contact</Link>
            </li>
          </ul>

          {/* Right side */}
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item dropdown">
                <div onClick={toggleMenu} style={{ cursor: "pointer" }}>
                  <Avatar>{getInitials(user.name)}</Avatar>
                </div>
                {showMenu && (
                  <div className="dropdown-menu show" style={{ position: "absolute", right: 0 }}>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/SignIn">Log In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/SignUp">Sign Up</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/Cart">
                <ShoppingCartIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
