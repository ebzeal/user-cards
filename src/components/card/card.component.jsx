import React from "react";


import "./card.styles.css";



export const Card = props => {
  const { country, openModal, countryName } = props;

 const setCountryName = () => {
   openModal()
   countryName(country.name)
  }
  

  return (
    <div className="card-container" onClick={setCountryName}>
      <img
        alt={country.name}
        src={country.flag}
      />
      <h1>{country.name}</h1>
      <p> {country.capital} </p>

    </div>
  );
};
