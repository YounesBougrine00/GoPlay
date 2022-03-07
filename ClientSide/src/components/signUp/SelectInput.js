import React, { useEffect, useMemo, useState, useLayoutEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { IoIosArrowDown } from "react-icons/io";


const style = {
  control: (base) => ({
    ...base,
    boxShadow: "none",
    border: "none",
    width: "370px",
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
function Selector(props) {
  return (
    <Select
      options={props.options}
      value={props.value}
      onChange={props.onChange}
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder={props.placeholder}
      onMenuClose={props.onMenuClose}
      onMenuOpen={props.onMenuOpen}
      styles={style}
      id={props.id}
      theme={(theme) => ({
        ...theme,
        borderRadius: 15,
        border: 0,
      })}
    />
  );
}

const setIconDirection = (value) => {
    document.documentElement.style.setProperty('--icon-direction', `${value}deg`);
    console.log("This Was Computed");
  }

function CountrySelector() {
  const [country, setValue] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([])
  const [data, setData] = useState([]);
  const [iconDirection,setDirection] =useState(0);
  const countries = useMemo(() => countryList().getData(), []);
    
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
    let villes = data[country.label];
    villes = villes?.map((str, index) => ({ label: str, value: index + 1 }));
    console.log(villes);
    setCities(villes);
    console.log(cities);
   
  }, [country]);
  
  
  const changeCountry = (value) => {
    setValue(value);
  };
  const changeCity = (city) => {
    setCity(city);
  };
  const onMenuOpen = () => {setDirection(180); console.log("This was computed")};
  const onMenuClose = () => {setDirection(0); console.log("This was computed")};

  return (
      
    <>
      <div className="input-icons select">
        <Selector
          options={countries}
          value={country}
          onChange={changeCountry}
          id="country"
          placeholder="Select your country"
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
        />
        <span className="icon-signup" style={{'transform':`rotate(${iconDirection}deg)`,"transformOrigin":"center"}}>
          <IoIosArrowDown size={20} id="icon" />
        </span>
      </div>
      <div className="input-icons select">
       <Selector
          options={cities}
          value={city}
          onChange={changeCity}
          id="city"
          placeholder="Select your city"
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
        />
        <span className="icon-signup">
          <IoIosArrowDown size={20} id="icon" style={{'transform':`rotate(${iconDirection}deg)`,"transformOrigin":"center"}} />
        </span>
      </div>
    </>
  );
}

export default CountrySelector;
