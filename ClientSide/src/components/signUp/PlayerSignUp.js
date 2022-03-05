import React from 'react';
import Navbar from "../login/loginNavbar";
import SignUpForm from './SignUpForm';


function PlayerSignUp() {
  return (
    <div>
        <header>
            <Navbar />
        </header>
        <div className="scontainer">
            <SignUpForm />
        </div>

    </div>
  )
}

export default PlayerSignUp