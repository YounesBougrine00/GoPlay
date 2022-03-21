import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { BiTime } from "react-icons/bi";
import { GrContact } from "react-icons/gr";
import {Link} from "react-router-dom";

function Stade(props) {
  const {_id, picture, name, sports,endTime, adress, contact} = props.stadiumData
  return (
    <div className="stade" key={_id}>
      <div className="stade_img">
        <img src={picture} alt="" />
      </div>
      <div className="stade_details">
        <div className="informations">
          <div>
            <h3>{name}</h3>
          </div>
          <div>
            {sports.map(sport => <p key={sport}>{sport} . </p>)}
          </div>
          <div>
            <span style={{ marginRight: "5px" }}>
              <HiLocationMarker size={30} />
            </span>
            <p>{adress}</p>
          </div>
          <div>
            <span style={{ marginRight: "5px" }}>
              <BiTime size={30} />
            </span>
            <p>Ouvert, ferme à {endTime}</p>
          </div>
          <div>
            <span style={{ marginRight: "5px" }}>
              <GrContact size={25} />
            </span>
            <p>Contact : {contact}</p>
          </div>
        </div>
        <div className="reserver">
          <button className="details">détails</button>
          <Link to={`${_id}`}><button className="book">Book Now</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Stade;
