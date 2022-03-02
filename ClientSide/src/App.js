import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import SignUp from "./components/signUp/signUp";
import PlayerSignUp from "./components/signUp/PlayerSignUp";
import OwnerSignUp from "./components/signUp/OwnerSignUp";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="main-route-place">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<SignUp />} />
            <Route exact path="/player-register" element={<PlayerSignUp />} />
            <Route exact path="/owner-register" element={<OwnerSignUp />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
