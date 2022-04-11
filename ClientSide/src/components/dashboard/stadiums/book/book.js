import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";

import { dispatchGetStadium } from "../../../../redux/actions/stadiumAction";

import { useSelector, useDispatch } from "react-redux";

import ConfirmChoice from "./confirmChoice";
import DatePicker from "./datePicker";
import Payment from "./payment";
import { showErrMsg } from "../../../utils/notifications/Notification";

import "./book.css";

const initialState = {
  sport: "",
  fieldType: "",
  time:  new Date(),
  resTime: ""
};
function Book() {
  const [reservationData, setReservationData] = useState(initialState);
  const stade = useSelector((state) => state.stade);
  const { stadium, loading } = stade;
  const {_id} = stadium

  const { sport, fieldType, time, resTime, errorMsg } = reservationData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get the userId param from the URL.
  let { sid } = useParams();
  useEffect(() => {
    dispatch(dispatchGetStadium(sid));
  }, []);

  const changeSport = (value) => {
    setReservationData({ ...reservationData, sport: value });
  };
  const changeField = (value) => {
    setReservationData({ ...reservationData, fieldType: value });
  };
  const changeDate = (value) => {
    setReservationData({ ...reservationData, time: new Date(value) });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let selectedTime = value.split(':')
    setReservationData({ ...reservationData, [name]: parseInt( selectedTime[0])});
  };

  return (
    <div className="book_phases">
      <div className="phases">
        <div className="back">
          <button onClick={() => navigate(-1)}>
            <IoArrowBackCircleOutline size={50} />
          </button>
        </div>
        <div className="stages">
          <div>
            <h3>Confrim your choice</h3>
            <span>
              <BsCheckCircleFill />
            </span>
          </div>
          <div>
            <h3>Schedule</h3>
            <span>
              <BsCheckCircleFill />
            </span>
          </div>
          <div>
            <h3>Payment</h3>
            <span>
              <BsCheckCircleFill />
            </span>
          </div>
          <div>
            <h3>Confirmation</h3>
            <span>
              <BsCheckCircleFill />
            </span>
          </div>
        </div>
      </div>
      <Routes>
        <Route
          exact
          path="choice"
          element={
            <ConfirmChoice
              stadiumData={stadium}
              loading={loading}
              sport={sport}
              changeSport={changeSport}
              fieldType={fieldType}
              changeField={changeField}
            />
          }
        />
        <Route path="date" element={<DatePicker time={time} sport={sport} fieldType={fieldType} changeDate={changeDate} handleInputChange={handleInputChange} resTime={resTime}/>} />
        <Route path="payment" element={<Payment time={time} sport={sport} fieldType={fieldType} resTime={resTime}/>} />
      </Routes>
    </div>
  );
}

export default Book;
