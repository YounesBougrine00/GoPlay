import React, { useMemo, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import Loader from "../../../utils/Loader/loader";
import { BiSearchAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './DateTimePicker.css';

import './datepicker.css';

const time = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];
function DatePicker() {
  const [value, onChange] = useState(new Date());

    const stade = useSelector((state) => state.stade);
    const {stadium,loading} = stade;
    const {_id} = stadium;

  const navigate = useNavigate();

  const displayTimes = time.map((n, index) => {
    return(
        <div className="box" key={index}>
      <label>
        <input type="radio" name="time" id="time" />
        <span>{n}</span>
      </label>
    </div>
    )
  });
  return (
    <div className="date_phase">
        <div className="searchDate">
        <form className="dateForm" action="">
          <div>
            <DateTimePicker onChange={onChange} value={value} disableClock />
          </div>
          <button className="search_date">
            <BiSearchAlt size={30} id="icon" />
          </button>
        </form>
      </div>
      <div className="selectTime">{displayTimes}</div>
      <div className="confirmChoice"><Link to={`/my/stadiums/${_id}/payment`} ><button className="confirm">Confirm choice</button></Link></div>
    </div>
  );
}

export default DatePicker;
