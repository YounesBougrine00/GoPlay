import Navbar from "../login/loginNavbar";
import "./signUp.scss";
import player from "../../images/close-up-soccer-striker-ready-1942936.jpg";
import owner from "../../images/bbca0.jpg";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="scontainer">
        <div className="sbox">
          <Link to="/player-register">
            <div className="img">
              <img src={player} alt="" />
            </div>
            <div>
              <button>You are a Player</button>
            </div>
          </Link>
        </div>
        <div className="sbox sbox2">
          <Link to="/owner-register">
            <div className="img">
              <img src={owner} alt="" />
            </div>
            <div>
              <button>You are a stadium owner</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
