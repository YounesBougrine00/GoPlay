import React ,{useEffect} from 'react'
import {BsCheckCircleFill} from "react-icons/bs"
import {IoArrowBackCircleOutline} from "react-icons/io5"
import { Route, Routes, useParams, useNavigate } from 'react-router-dom'

import {
  dispatchGetStadium,
} from "../../../../redux/actions/stadiumAction";

import { useSelector,useDispatch } from 'react-redux'

import ConfirmChoice from './confirmChoice'
import DatePicker from './datePicker';
import Payment from './payment';

import './book.css'

const initialState ={
  sport:"",
  fieldType:"",
  time:"",
}
function Book() {

  const stade = useSelector((state) => state.stade);
  const {stadium,loading} = stade;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get the userId param from the URL.
  let { sid } = useParams();
  useEffect(()=> {
    dispatch(dispatchGetStadium(sid))
  },[])

  return (
    <div className='book_phases'>
      <div className='phases'>
        <div className='back'><button onClick={() => navigate(-1)}><IoArrowBackCircleOutline size={50} /></button></div>
        <div className='stages'>
          <div><h3>Confrim your choice</h3><span><BsCheckCircleFill /></span></div>
          <div><h3>Schedule</h3><span><BsCheckCircleFill /></span></div>
          <div><h3>Payment</h3><span><BsCheckCircleFill /></span></div>
          <div><h3>Confirmation</h3><span><BsCheckCircleFill /></span></div>
        </div>
      </div>
          <Routes>
              <Route exact path="choice" element={<ConfirmChoice stadiumData={stadium} loading={loading}/>}/>
              <Route  path="date" element={<DatePicker />} />
              <Route  path="payment" element={<Payment />} />
          </Routes>
    </div>
  )
}

export default Book