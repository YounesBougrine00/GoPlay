import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function SessionNavbar() {
  const auth = useSelector((state) => state.auth);

  const { user } = auth;

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/api/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
    }
  };

  const UserLink = () => {
    return (
      <div className="drop-infos">
        <ul className="dropdown">
          <li>Welcome {user.username}</li>
          <li>
            <Link to="/" onClick={handleLogout}>
              <button id="logout" type="button" >
              Log out
            </button>
            </Link>
            
          </li>
        </ul>
      </div>
    );
  };

  
  return (
    <>
      <div className="navbar-brand">
        <Link to="/">
          <h2>
            GoPlay<span id="point">.</span>
          </h2>
        </Link>
      </div>
      <div className="navbar">
        <nav>
          <ul id="nav-list" className="nav navbar-nav">
            <div>
              <li>
                <Link to="/my/stadiums">Stadiums</Link>
              </li>
            </div>
            <div>
              <li>
                <Link to="/my/dashboard/reservations">Dashboard</Link>
              </li>
            </div>
            <div>
              <li>
                <Link to="/my/events">Events</Link>
              </li>
            </div>
            <div>
              <li>
                <Link to="/my/blogs">Blog</Link>
              </li>
            </div>
          </ul>
        </nav>
      </div>
      <UserLink />
    </>
  );
}

export default SessionNavbar;
