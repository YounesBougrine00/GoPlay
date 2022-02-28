import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="navbar-brand">
        <h2>
          GoPlay<span>.</span>
        </h2>
      </div>
      <div>
        <ul id="nav-list" className="nav navbar-nav">
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
