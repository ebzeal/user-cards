import React from "react";
import { Card } from "../card/card.component";
import "./card-list.styles.css";


export const CardList = props => {
  const { countries, page, openModal } = props;
  
  return (
    <div className="card-list">
      {countries.map(country => (
        <Card key={countries.indexOf(country)} number= {countries.indexOf(country)} country={country} openModal={openModal}
        countryName={props.countryName}
        ></Card>
      ))}
    </div>
  );
};
