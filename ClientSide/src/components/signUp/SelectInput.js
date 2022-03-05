import React, {useMemo, useState} from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
// import "./select.scss";

// const styleProxy = new Proxy(
//     {},
//     {
//       get: (target, propKey) => () => {}
//     }
//   );

// function Menu(props) {
//     const navList = ["all", "javascript", "python", "ruby"];
//     return (
//         <>
//             {props.data.map(({name,idd})=> (
//             <option  value="">{name.common}</option>
//             ))}
//         </>
        
//   )
// }
// function Selector() {
//   const [data, setValue] = useState([]);
//   fetch("https://restcountries.com/v3.1/all")
//     .then((resp) => resp.json())
//     .then((res) => setValue(res))
//     .catch((err) => {
//       console.log(err);
//     });

//   return (
//         <Menu data={data} />
//   )
// }

// export default Selector;

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
        marginLeft : "15px"
      }),
      valueContainer: (provided,state) => ({
          ...provided,
          padding:0
      }),
      placeholder: (provided,state) => ({
        ...provided,
        marginRight:0,
        marginLeft:"15px"
    }),
    input: (provided,state) => ({
        ...provided,
        margin: 0,
        marginLeft:"15px",
        padding:0
    }),
}
function CountrySelector({placeholder,id}) {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  console.log(options);

  const changeHandler = value => {
    setValue(value)
  }

  return <Select options={options} value={value} onChange={changeHandler} 
  className="react-select-container" classNamePrefix="react-select" placeholder={placeholder} styles={style}
  id={id}
  theme={(theme) => ({
    ...theme,
    borderRadius: 15,  
    border:0 
  })}

    />
}

export default CountrySelector
