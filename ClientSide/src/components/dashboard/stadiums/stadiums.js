import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./stadiums.css";
import {
  dispatchGetStadiumBySelect,
  dispatchGetStadiumBySearch,
  dispatchGetStadium,
} from "../../../redux/actions/stadiumAction";
import { Selector } from "../../signUp/SelectInput";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notifications/Notification";
import Loader from "../../utils/Loader/loader";

import { BiSearchAlt } from "react-icons/bi";
import Stade from "./stade";

export const styleBar = {
  control: (base) => ({
    ...base,
    boxShadow: "none",
    border: "none",
    width: "250px",
    height: "50px",
    marginBottom: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "50px",
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "50px",
    paddingRight: "10px",
    marginLeft: "15px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: 0,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    marginRight: 0,
    marginLeft: "15px",
  }),
  input: (provided, state) => ({
    ...provided,
    margin: 0,
    marginLeft: "15px",
    padding: 0,
  }),
};
const sportTypes = [
  { value: "foot", label: "Football" },
  { value: "basket", label: "Basketball" },
  { value: "volley", label: "Volleyball" },
];
const initialState = {
  errSearch: "",
  success: "",
  query: "",
};
const initialSelectState = {
  errSelect: "",
  successSelect: "",
  sportType: "",
  city: "",
};

const LoaderOverlay = () => {
  return (
    <div className="loaderOverlay">
      <Loader />
    </div>
  );
};

function Stadiums() {
  const [searchData, setSearchData] = useState(initialState);
  const [selectData, setSelectData] = useState(initialSelectState);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const stade = useSelector((state) => state.stade);

  const { stadiums, loading, noResult } = stade;

  const { user } = auth;

  let cities = user ? data[user.country] : [];
  cities = cities?.map((str, index) => ({ label: str, value: index + 1 }));

  const { city, sportType, errSelect } = selectData;
  const { errSearch, query } = searchData;

  useLayoutEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.json"
    )
      .then((resp) => resp.json())
      .then((res) => {
        setData(res);
        console.log(res["Albania"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    dispatch(
      dispatchGetStadiumBySelect({ label: user.city }, { label: "Football" })
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value, err: "", success: "" });
  };

  const changeCity = (city) => {
    setSelectData({ ...selectData, city: city });
  };
  const changeSport = (sportType) => {
    setSelectData({ ...selectData, sportType: sportType });
  };

  const ResultFailure = () => <div className="failure-message">{noResult}</div>;

  const handleOnSubmitSelect = (e) => {
    e.preventDefault();
    dispatch(dispatchGetStadiumBySelect(city, sportType));
  };

  const handleOnSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(dispatchGetStadiumBySearch(query));
  };

  return (
    <>
      {noResult && showErrMsg(noResult)}
      <div className="s_session-container">
        <div className="s_head">
          <div className="img">
            <form onSubmit={handleOnSubmitSelect}>
              <div className="input-icons select">
                <Selector
                  options={cities}
                  value={city}
                  onChange={changeCity}
                  inputId="city"
                  name="city"
                  placeholder="Select a city"
                  styles={styleBar}
                />
              </div>
              <div className="input-icons select">
                <Selector
                  options={sportTypes}
                  value={sportType}
                  onChange={changeSport}
                  inputId="sportType"
                  name="sportType"
                  placeholder="Select your sport"
                  styles={styleBar}
                />
              </div>
              <button className="select_search">
                <BiSearchAlt size={20} id="icon" />
              </button>
            </form>
            <form onSubmit={handleOnSubmitSearch}>
              <div className="input-icons">
                <input
                  type="text"
                  id="query"
                  onChange={handleInputChange}
                  name="query"
                  placeholder="Search for your stadium by name..."
                />
                <button className="search">
                  <BiSearchAlt size={20} id="icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <aside className="s_sidebar">
          <div></div>
          <div></div>
        </aside>
        <div className="s_content">
          {loading ? (
            <LoaderOverlay />
          ) : noResult === "" ? (
            stadiums.map((stade) => <Stade stadiumData={stade} />)
          ) : (
            <ResultFailure />
          )}
        </div>
        <footer></footer>
      </div>
    </>
  );
}

export default Stadiums;
