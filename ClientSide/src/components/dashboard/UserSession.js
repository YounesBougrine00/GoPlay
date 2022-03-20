import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./dashboard";
import SessionNavbar from "./sessionNavbar";
import Stadiums from "./stadiums/stadiums";
import Book from "./stadiums/book";
import "./dashboard.css";

import { useSelector} from 'react-redux'


const HelloWorld = () => <div>Hello</div>;

function UserSession() {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  
  if(!isLogged){
    return <Navigate to="/"/>
  }
  return (
    <div>
      <header>
        <SessionNavbar />
      </header>
      <div className="session">
        <Routes>
          <Route path="stadiums" element={<Stadiums />} />
          <Route path="stadiums/:sid" element={<Book />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="events" element={<HelloWorld />} />
          <Route path="blogs" element={<HelloWorld />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserSession;
