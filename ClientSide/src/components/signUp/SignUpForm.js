import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import {HiOutlineMail} from "react-icons/hi";
import {IoIosArrowDown} from "react-icons/io";
import {BsPhoneVibrate} from "react-icons/bs";

import CountrySelector from "./SelectInput";

export default function SignUpForm() {
  return (
    <>
      <div className="parent-pbox">
        <form action="" id="player-singUp">
          <div className="pbox">
            <div className="input-icons">
              <input type="text" id="username" placeholder="Enter a username" />
              <span className="icon-signup">
                <AiOutlineUser size={20} id="icon" />
              </span>
            </div>
            <div className="input-icons">
              <input type="email" id="email" placeholder="Enter your email" />
              <span className="icon-signup">
                <HiOutlineMail size={20} id="icon" />
              </span>
            </div>
            <div className="input-icons">
              <input type="password" id="password" placeholder="Choose a password" />
              <span className="icon-signup">
                <RiLockPasswordFill size={20} id="icon" />
              </span>
            </div>
          </div>
          <div className="pbox">
            <div className="input-icons select">
              <CountrySelector id="country" placeholder="Select your country"/>
              <span className="icon-signup">
                <IoIosArrowDown size={20} id="icon" />
              </span>
            </div>
            <div className="input-icons select">
              <CountrySelector id="city" placeholder="Select your city"/>
              <span className="icon-signup">
                <IoIosArrowDown size={20} id="icon" />
              </span>
            </div>
            <div className="input-icons">
              <input type="number" id="number" placeholder="Enter your phone number" />
              <span className="icon-signup">
                <BsPhoneVibrate size={20} id="icon" />
              </span>
            </div>
          </div>
        </form>
        <button className="pbox" type="submit" form="player-singUp">
          Sign Up
        </button>
      </div>
    </>
  );
}
