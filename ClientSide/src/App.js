import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import SignUp from "./components/signUp/signUp";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="main-route-place">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
