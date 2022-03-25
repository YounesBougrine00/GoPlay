import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Reservations from "./reservations";

const Hello = () => (<div>Hello Younes</div>);
function Dashboard() {
  const auth = useSelector((state) => state.auth);

  const { user } = auth;
    console.log("This was computed")
  return (
    <div className="session-container">
      <div className="head">
        <div className="img">
          <h2>Your Dashboard</h2>
        </div>
      </div>
      <aside className="sidebar">
        <div className="welcome">
          <h3>Welcome {user.username} !</h3>
          <br />
          <p>check your reservations and find new opponents</p>
        </div>
        <nav>
          <ul>
            <div>
              <Link to="/my/dashboard/reservations">
                <button>My Reservations</button>
              </Link>
            </div>
            <div>
              <Link to="/my/dashboard/team">
                <button>My Team</button>
              </Link>
            </div>
            <div>
              <Link to="/my/dashboard/opponents">
                <button>Opponents</button>
              </Link>
            </div>
            <div>
              <Link to="/my/dashboard/clubs">
                <button>My Clubs</button>
              </Link>
            </div>
          </ul>
        </nav>
      </aside>
      <div className="content">
        <Routes>
          <Route  path="reservations" element={<Reservations />} />
          <Route  path="team" element={<Hello />} />
          <Route  path="opponents" element={<Hello />} />
          <Route  path="opponents" element={<Hello />} />
        </Routes>
      </div>
      <footer></footer>
    </div>
  );
}

export default Dashboard;
