import React from 'react';
import {HiLocationMarker} from 'react-icons/hi';
import {MdDirections} from 'react-icons/md';
import {BiTime} from 'react-icons/bi';
import {FiDownloadCloud} from 'react-icons/fi';
import picture from '../../images/norvec-cageball-field.jpg';

function Reservations() {
  return (
    <div className="reservations">
        <div className='picture'>
            <img src={picture} alt="" />
        </div>
        <div className='infos'>
            <div><h3>WELLNESS & SPORT CENTER MOROCCO</h3></div>
            <div><span style={{"marginRight": "5px"}}><HiLocationMarker size={30}/></span><p>Av Allal El Fassi, Rabat Maroc</p></div>
            <div><button style={{"background": "rgb(68, 25, 226"}}><span><MdDirections size={30}/></span>itinéraire</button></div>
            <div><span style={{"marginRight": "5px"}}><BiTime size={30}/></span><p>Match réservé à 11:00</p></div>
            <div><button className='voucher'><span><FiDownloadCloud size={30}/></span>Your voucher<span></span></button></div>
            <div><button>Change reservation date</button></div>
        </div>
    </div>
  )
}

export default Reservations;