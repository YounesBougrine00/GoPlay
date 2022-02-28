import Navbar from "./loginNavbar";
import SignIn from "./signIn";
import "./login.css";
import { BrowserRouter as Router,
    Link,
     Route } from "react-router-dom";



export default function Login() {


    return(
        <div>
            <Router>
                <header>
                    <nav>
                        <Navbar />
                        <div>
                            <Link to="/register">
                                <button type="button">Sign up</button>
                            </Link>
                        </div>
                    </nav>
                </header>
                <div className="container">
                    <div>
                        <SignIn />
                        <div>
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div>
                        <p>
                            Welcome to our world where we will change your experience
                             with your favorite sport and make it more exciting

                            You will be capable to planify easily a match with your 
                            friends or why not with new friends that you can meet in our application 
                        </p>
                    </div>
                </div>
            </Router>
            
        </div>
    )


}