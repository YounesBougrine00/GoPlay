import React from "react";
import "./payment.css";
import { useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { BiTime } from "react-icons/bi";
import { Selector } from "../../../signUp/SelectInput";
import { Link } from 'react-router-dom'

export const styles = {
    control: (base) => ({
      ...base,
      boxShadow: "none",
      border: "1px solid black",
      height: "50px",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "20px",
    })
}

function Payment(props) {

    const stade = useSelector((state) => state.stade);
    const {stadium,loading} = stade;
    const {picture,name} = stadium;
  
  return (
    <div className="payment_phase">
      <div>
        <h1>Your reservation</h1>
      </div>
      <hr />
      <div className="stade">
        <div className="stade_img">
          <img src={picture} alt="" />
        </div>
        <div className="stade_details">
          <div className="informations">
            <div>
              <h3>{name}</h3>
            </div>
            <div>
              <p>Sport : {props.sport.label}</p>
            </div>
            <div>
              <p>Field : {props.fieldType.label}</p>
            </div>
            <div>
              <span style={{ marginRight: "5px" }}>
                <BiTime size={30} />
              </span>
              <p>Match reserved at {props.resTime}H,  date : {props.time.getDate()}/{props.time.getMonth()+1}/{props.time.getFullYear()} </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Payment</h1>
      </div>
      <hr />
      <div className="payment_cards">
          <div className="your_cards">
            <div><h1>Your Cards</h1></div>
            <div className="select_card"> 
                <Selector
                    // options={sportsType}
                    // value={props.sport}
                    // onChange={props.changeCity}
                    inputId="sport"
                    name="sport"
                    placeholder="Select your card"
                    styles={styles}
                 />
            </div>
          </div>
          <div className="add_cards">
            <div><h1>Add a card</h1></div>
            <div className="add"><button className="add">Add a card</button></div>
          </div>
      </div>
      <div className="confirm_payment"><Link to=""><button>Confirm Payment</button></Link></div>
    </div>
  );
}

export default Payment;
