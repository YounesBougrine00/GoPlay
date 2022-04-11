import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { BiTime } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import { Selector } from "../../../signUp/SelectInput";
import { styleBar } from "../stadiums";
import Loader from "../../../utils/Loader/loader";
import { showErrMsg } from "../../../utils/notifications/Notification";
import { clearStadiumStates } from "../../../../redux/actions/stadiumAction";
import { useDispatch } from "react-redux";

const newStyle = {
  ...styleBar,
  control: (base) => ({
    ...base,
    boxShadow: "none",
    border: "1px solid black",
    width: "200px",
  }),
};

function ConfirmChoice(props) {
  const {
    _id,
    picture,
    name,
    sports,
    fields,
    endTime,
    description,
    adress,
    price,
  } = props.stadiumData;
  let sportsType = sports?.map((str, index) => ({
    label: str,
    value: index + 1,
  }));
  let fieldsType = fields?.map((str, index) => ({
    label: str,
    value: index + 1,
  }));
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoaderOverlay = () => {
    return (
      <div className="loaderOverlay">
        <Loader />
      </div>
    );
  };
  const confirmYourChoice = (value) => {
    if (props.sport && props.fieldType) {
      navigate(`/my/stadiums/${_id}/date`);
    } else {
      setErrMsg(value);
    }
  };
  return (
    <div className="phaseInfos">
      <div className="choice_image">
        {props.loading ? <LoaderOverlay /> : <img src={picture} alt="" />}
      </div>
      <div className="choice_infos">
        {props.loading ? (
          <LoaderOverlay />
        ) : (
          <>
            {errMsg && showErrMsg(errMsg)}
            <div className="info">
              <h3>{name}</h3>
            </div>
            <div>
              <p>{description}</p>
            </div>
            <div className="info">
              <span style={{ marginRight: "5px" }}>
                <HiLocationMarker size={30} />
              </span>
              <p>{adress}</p>
            </div>
            <div className="info">
              <span style={{ marginRight: "5px" }}>
                <BiTime size={30} />
              </span>
              <p>Ouvert, ferme à {endTime}</p>
            </div>
            <div>
              <Selector
                options={sportsType}
                value={props.sport}
                onChange={props.changeSport}
                inputId="sport"
                name="sport"
                placeholder="Select your sport"
                styles={newStyle}
              />
            </div>
            <div>
              <Selector
                options={fieldsType}
                value={props.fieldType}
                onChange={props.changeField}
                inputId="fieldType"
                name="fieldType"
                placeholder="Select field type"
                styles={newStyle}
              />
            </div>
            <div className="info">
              <p>Price : {price} </p>
            </div>
            <div className="choice_book">
              <button onClick={()=>{confirmYourChoice("Please fill all the fields")}}>Confirm your choice</button>
            </div>
            <div className="choice_cancel">
              <button
                onClick={() => {
                  navigate(-1);
                  dispatch(clearStadiumStates);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ConfirmChoice;
