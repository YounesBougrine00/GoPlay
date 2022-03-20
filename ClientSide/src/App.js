import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';

import { useEffect } from "react";

import Login from "./components/login/login";
import SignUp from "./components/signUp/signUp";
import PlayerSignUp from "./components/signUp/PlayerSignUp";
import OwnerSignUp from "./components/signUp/OwnerSignUp";
import UserSession from "./components/dashboard/UserSession";
import { dispatchGetUser, dispatchLogin, fetchUser } from "./redux/actions/loginAction";

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {isLogged} = auth

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        console.log("Im here");
        const res = await axios.post('/api/user/authtoken', null)
        console.log(res)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = async () => {
        dispatch(dispatchLogin())

        const res = await fetchUser(token);
        dispatch(dispatchGetUser(res));
      }
      getUser()
    }
  },[token, dispatch])
  
  return (
    <div className="App">
      <Router>
        <div className="main-route-place">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<SignUp />} />
            <Route exact path="/player-register" element={<PlayerSignUp />} />
            <Route exact path="/owner-register" element={<OwnerSignUp />} />
            <Route exact path="/my/*" element={<UserSession />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
