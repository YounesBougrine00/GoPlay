import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { BsPhoneVibrate } from "react-icons/bs";
import {
  showErrMsg,
  showSuccessMsg,
} from "../utils/notifications/Notification";
import axios from "axios";

import CountrySelector from "./SelectInput";

const initialState = {
  username: "",
  email: "",
  password: "",
  country: "",
  city: "",
  number: "",
  err: "",
  success: "",
};

export default function SignUpForm() {
  const [formData, setFormData] = useState(initialState);
  const { username, email, password, country,city,phone, err, success } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, err: "", success: "" });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/register", {
        username,
        email,
        password,
        country,
        city,
        phone,
      });
      setFormData({ ...formData, err: "", success: res.data.message });
    } catch (err) {
      err.response.data.message && setFormData({ ...formData, err: err.response.data.message, success: "" });
    }
  };

  const changeCountry = (value) => {
    setFormData({...formData, country: value, city: ''});
  };
  const changeCity = (city) => {
    setFormData({...formData, city: city});
  };

  return (
    <>
      <div className="parent-pbox">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <form onSubmit={handleOnSubmit} id="player-singUp">
          <div className="pbox">
            <div className="input-icons">
              <input
                type="text"
                id="username"
                onChange={handleInputChange}
                name="username"
                placeholder="Enter a username"
              />
              <span className="icon-signup">
                <AiOutlineUser size={20} id="icon" />
              </span>
            </div>
            <div className="input-icons">
              <input
                type="email"
                id="email"
                onChange={handleInputChange}
                name="email"
                placeholder="Enter your email"
              />
              <span className="icon-signup">
                <HiOutlineMail size={20} id="icon" />
              </span>
            </div>
            <div className="input-icons">
              <input
                type="password"
                id="password"
                onChange={handleInputChange}
                name="password"
                placeholder="Choose a password"
              />
              <span className="icon-signup">
                <RiLockPasswordFill size={20} id="icon" />
              </span>
            </div>
          </div>
          <div className="pbox">
            <CountrySelector country={country} city={city} changeCity={changeCity} changeCountry={changeCountry} />
            <div className="input-icons">
              <input
                type="number"
                id="phone"
                onChange={handleInputChange}
                name="phone"
                placeholder="Enter your phone number"
              />
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
