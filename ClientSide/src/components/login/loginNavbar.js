import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="navbar-brand">
        <h2>
          GoPlay<span>.</span>
        </h2>
      </div>
      <div className="navbar">
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
