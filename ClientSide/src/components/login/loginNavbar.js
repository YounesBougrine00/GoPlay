import { Link } from "react-router-dom";

export default function Navbar() {
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
        {/* <input type="checkbox" id="menu" />
        <label for="menu">Menu</label> */}
        <nav>
          <ul id="nav-list" className="nav navbar-nav">
            <div>
              <li>
                <Link to="/about">About us</Link>
              </li>
            </div>
            <div>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
            </div>
            <div>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
}
