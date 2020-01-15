import React from "react";
import { Card } from "../card/card.component";
import "./card-list.styles.css";


export const CardList = props => {
  const { countries, page, openModal } = props;
  const pageLessOne = page - 1;
  const pageStart = pageLessOne * 20;
  const pageEnd = pageStart + 20;
  const countrySort = countries.slice(pageStart, pageEnd);
  return (
    <div className="card-list">
      {countrySort.map(country => (
        <Card key={countries.indexOf(country)} number= {countries.indexOf(country)} country={country} openModal={openModal}
        countryName={props.countryName}
        ></Card>
      ))}
    </div>
  );
};
