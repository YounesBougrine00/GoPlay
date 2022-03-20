import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  showErrMsg,
  showSuccessMsg,
} from "../utils/notifications/Notification";
import axios from "axios";
import { useDispatch } from "react-redux";
import { dispatchLogin } from "../../redux/actions/loginAction";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

export default function SignIn() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { email, password, err, success } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, err: "", success: "" });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/login", { email, password });
      setFormData({ ...formData, err: "", success: res.data.message });

      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
    } catch (err) {
      err.response.data.message &&
        setFormData({
          ...formData,
          err: err.response.data.message,
          success: "",
        });
    }
  };
  return (
    <>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <br />
      <div>
        <form onSubmit={handleOnSubmit}>
          <div className="input-icons">
            <input
              onChange={handleInputChange}
              type="text"
              value={email}
              id="email"
              name="email"
              placeholder="Email or username"
            />
            <span className="icon">
              <AiOutlineUser id="icon"  size={25}/>
            </span>
          </div>
          <div className="input-icons">
            <input
              onChange={handleInputChange}
              type="password"
              value={password}
              id="password"
              name="password"
              placeholder="Password"
            />
            <span className="icon">
              <RiLockPasswordFill id="icon" size={25}/>
            </span>
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
}
