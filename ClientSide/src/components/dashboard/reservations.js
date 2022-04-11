import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {HiLocationMarker} from 'react-icons/hi';
import {MdDirections} from 'react-icons/md';
import {BiTime} from 'react-icons/bi';
import {FiDownloadCloud} from 'react-icons/fi';
import Loader from '../utils/Loader/loader';
import axios from 'axios';
import { useSelector } from 'react-redux';

const initialState = {
  name : "",
  adress : "",
  resTime: "",
  picture: "",
  err:"",
  loading: true,
  date:new Date()
}

function Reservations() {
  const [reservationsData, setReservationsData] = useState(initialState)
  const {name, adress,resTime,err, loading,picture,date} = reservationsData

  const auth = useSelector((state) => state.auth); 
  const {user} = auth

  const navigate = useNavigate()

  const LoaderOverlay = () => {
    return (
      <div className="loaderOverlay">
        <Loader />
      </div>
    );
  };
  const getUserReservations = async() => {
    try {
      const result = await axios.post('/api/reservations/get-user-reservations', {id : user._id})
      console.log(result)
      const {name, adress, picture} = result.data[1]
      const {resTime, date} = result.data[0]
      setReservationsData({ ...reservationsData, name: name,resTime: resTime,adress:adress,picture:picture,date:new Date(date), err:"", loading: false})
    } catch (error) {
      console.log(error)
      error.response.data.message && setReservationsData({ ...reservationsData, err: error.response.data.message, loading:false});
    }
  }

  useEffect(() => {
    getUserReservations()
  }, [])

  return (
    <div className="reservations">
      {loading ? (<LoaderOverlay />) 
      :
      (err ? <div className='no_reservations'>
                <p>{err}</p>
                <button className='find' onClick={() => navigate('/my/stadiums')}>Find a stadium Now</button>
              </div> 
      :
      <>
        <div className='picture'>
                    <img src={picture} alt="" />
        </div>
        <div className='infos'>
            <div><h3>{name}</h3></div>
            <div><span style={{"marginRight": "5px"}}><HiLocationMarker size={30}/></span><p>{adress}</p></div>
            <div><button style={{"background": "rgb(68, 25, 226"}}><span><MdDirections size={30}/></span>itinéraire</button></div>
            <div><span style={{"marginRight": "5px"}}><BiTime size={30}/></span><p>Match réservé à {resTime}:00, {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</p></div>
            <div><button className='voucher'><span><FiDownloadCloud size={30}/></span>Your voucher<span></span></button></div>
            <div><button>Change reservation date</button></div>
        </div>           
      </>
      )
      }
    </div>
  )
}

export default Reservations;