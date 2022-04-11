import Navbar from "./loginNavbar";
import SignIn from "./signIn";
import "./login.css";
import pic from "./pic1 PNG.png";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Navigate } from "react-router-dom";

export default function Login() {

  const auth = useSelector((state) => state.auth);
  const {  isLogged } = auth;
  
  if(isLogged){
    return <Navigate to="/my/dashboard/reservations"/>
  }
  return (
    <div>
        <header>
          <Navbar />
          <div>
            <Link to="/register">
              <button id="signup" type="button">Sign up</button>
            </Link>
          </div>
        </header>
        <div className="container">
          <div className="box1">
            <div>
              <SignIn />
            </div>
            <div>
              <img src={pic} alt="" />
            </div>
          </div>
          <div className="box2">
            <p>
                Welcome to our world where we will change your experience with
                your favorite sport and make it more exciting<br /><br />
                
                You will be capable to planify easily a match with<br/> your friends
                or why not with new friends that you can meet in our application
            </p>
          </div>
        </div>
    </div>
  );
}
