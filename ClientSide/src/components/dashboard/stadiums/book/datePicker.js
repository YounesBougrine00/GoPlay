import React, { useEffect, useState,useLayoutEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import Loader from "../../../utils/Loader/loader";
import { showErrMsg } from "../../../utils/notifications/Notification";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './DateTimePicker.css';
import { pullReservations } from "../../../../redux/actions/bookingAction";

import './datepicker.css';

const timeAvailable = [
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
];
function DatePicker(props) {
//   const [value, onChange] = useState(new Date());

  const dispatch = useDispatch();

  const stade = useSelector((state) => state.stade);
  const booking = useSelector((state) => state.booking)
  const [err, setErr] = useState("");

  const {stadium} = stade;
  const {_id} = stadium;

  const {loading, reservations} = booking


  const navigate = useNavigate();

  const confirmYourDate = (value) => {
    if (props.resTime && props.sport && props.fieldType) {
      navigate(`/my/stadiums/${_id}/payment`);
    } else {
      setErr(value);
    }
  };
  const LoaderOverlay = () => {
    return (
      <div className="loaderOverlay">
        <Loader />
      </div>
    );
  };

  let list = []
  let moment = new Date()
  const displayTimes = timeAvailable.map((n, index) => {
      let style = {'backgroundColor': 'rgb(13, 221, 13)'}
      reservations?.map((reservation)=> {
        if(reservation.resTime===n){
          style={'backgroundColor': 'rgb(231, 21, 21)', 'opacity' : 0.5};
          list.push(n)
        }
      })
      if((n<props.time.getHours()+1 && props.time.getDate()==moment.getDate()) || list.includes(n)){
        style.opacity = 0.5
        return(
          <div className="box" key={index}>
            <label>
              <input type="radio"  name="resTime" id="resTime" value={`${n}:00`} onChange={props.handleInputChange} disabled/>
              <span style={style} >{`${n}:00`}</span>
            </label>
          </div>
        )
      }else {
        return(
          <div className="box" key={index}>
            <label>
              <input type="radio" style={style} name="resTime" id="resTime" value={`${n}:00`} onChange={props.handleInputChange} />
              <span style={style}>{`${n}:00`}</span>
            </label>
          </div>
        )
      } 
    })

  const handleOnSearchDate = (e) =>{
    e.preventDefault();
    dispatch(pullReservations(props.time, _id));
  }

  useLayoutEffect(()=>{
    dispatch(pullReservations(props.time,_id))
  }, [])
  return (
    <div className="date_phase">
        <div className="searchDate">
        <form className="dateForm" onSubmit={handleOnSearchDate}>
          <div>
            <DateTimePicker onChange={props.changeDate} value={props.time} disableClock maxDetail="hour" minDate={new Date()}/>
          </div>
          <button className="search_date">
            <BiSearchAlt size={30} id="icon" />
          </button>
        </form>
      </div>
      {err && showErrMsg(err)}
      <div className="selectTime">
        {loading ?  <LoaderOverlay /> : displayTimes }
      </div>
      <div className="confirmChoice"><button onClick={()=>{confirmYourDate("Please choose your reservation time")}} className="confirm">Confirm choice</button></div>
    </div>
  );
}

export default DatePicker;
