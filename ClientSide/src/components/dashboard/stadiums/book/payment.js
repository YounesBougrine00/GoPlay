import React from "react";
import "./payment.css";
import { useSelector } from "react-redux";
import { BiTime } from "react-icons/bi";
import { Selector } from "../../../signUp/SelectInput";
import StripeCheckout from 'react-stripe-checkout'; 
import { useNavigate } from "react-router-dom";
import axios from 'axios';



import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
    const {picture,name, price,_id} = stadium;
    const navigate = useNavigate()

    const auth = useSelector((state) => state.auth); 
    const {user} = auth

    const handleSuccess = (msg) => {
      MySwal.fire({
        icon: 'success',
        title: msg,
        time: 4000,
      });
    };
    const handleFailure = () => {
      MySwal.fire({
        icon: 'error',
        title: 'Payment failure',
        time: 4000,
      });
    };

    const payNow = async (token) => {
      try {
        const payment = await axios.post('/api/reservations/create-reservation',{id: user._id,_id:_id,amount:price*10,token,sport:props.sport.label,fieldType:props.fieldType.label,resTime:props.resTime,time:props.time})
        console.log(payment)
        if (payment.status === 200) {
          handleSuccess(payment.data.message);
          navigate('/my/dashboard/reservations')
        }
      } catch (error) {
        handleFailure();
        console.log(error);
      }
    }
  
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
              <p>Price : <b>{price} DHS</b></p>
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
      <div className="confirm_payment">
        <div>
           <StripeCheckout
              stripeKey="pk_test_51KlaM7JHzzGLB3eHq1jbkl8ZWCakw1RhvQAGoG0ptaDAkzQj0a6ZeOpgqTmaU8iFJsBLpxqaRVKlxhPuN0rCXQhk00gkppWN0p"
              label="Confirm Payment"
              name="Pay With Credit Card"
              billingAddress
              shippingAddress
              amount={price*10}
              description={`Your total is ${price} MAD`}
              token={payNow}
            />
        </div>
      </div>
    </div>
  );
}

export default Payment;
