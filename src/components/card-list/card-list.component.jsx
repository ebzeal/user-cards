import React from "react";
import {withRouter} from 'react-router-dom';
import { Card } from "../card/card.component";
import "./card-list.styles.css";


const CardList = props => {
  const { countries, openModal, location, searchField } = props;
  const searchUrl = location.search;
  const pageLoad = searchUrl ? parseInt((searchUrl.split('='))[1]) : 1;
  const pageLessOne = pageLoad - 1;
  const pageStart = pageLessOne * 20;
  const pageEnd = pageStart + 20;
  const countrySort = searchField.length > 0 ? countries : countries.slice(pageStart, pageEnd);
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

export default withRouter(CardList)