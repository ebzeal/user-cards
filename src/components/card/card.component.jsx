import React from "react";
import "./card.styles.css";

export const Card = props => {
  const { country } = props;
  return (
    <div className="card-container">
      <img
        alt={country.name}
        src={country.flag}
      />
      <h1>{country.name}</h1>
      <p> {country.capital} </p>
    </div>
  );
};
