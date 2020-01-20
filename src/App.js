import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import CardList from "./components/card-list/card-list.component";
import { SearchBox } from "./components/searchbox/search-box.component";
import PaginationBar from "./components/pagination/paginationBar";
import ModalBox from "./components/modal/modal";
import CountryDetails from "./components/country-details/country-details";

import { filterUtil } from "./utils";
import "./App.css";

import loaderIcon from "./assets/loader.gif";

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      searchField: "",
      loaded: false,
      page: 1,
      modalIsOpen: false,
      countryName: ""
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(countries => this.setState({ countries }))
      .then(loaded => this.setState({ loaded: true }));
  }

  handleChange = e => {
    this.setState({
      page: 1,
      searchField: e.target.value.toLowerCase()
    });
  };

  getPageNumbers = (countryNumber = 250) => {
    const numberOfPages = Math.ceil(countryNumber / 20);

    let pageNumbers = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pageNumbers.push(`${i}`);
    }
    return pageNumbers.map(number => {
      return (
        <i className="pagesNumbered" onClick={this.setPage}>
          <Link to={`?page=${number}`}> {number} </Link>
        </i>
      );
    });
  };

  setPage = () => {
    return {};
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  getCountry = val => {
    this.setState({
      countryName: val
    });
  };

  filteredCountries = (countries, searchField) => {
    return countries.filter(country => {
      const { name, capital } = country;
      return filterUtil(name, searchField) || filterUtil(capital, searchField);
    });
  };

  CardListContainer = props => {
    const { countries, searchField, page } = this.state;
    const searchCountries = this.filteredCountries(countries, searchField);

    return (
      <CardList
        countries={searchCountries}
        page={page}
        openModal={this.openModal}
        countryName={this.getCountry}
        searchField={searchField}
        {...props}
      />
    );
  };

  render() {
    const { countries, searchField, loaded, countryName } = this.state;

    const searchCountries = this.filteredCountries(countries, searchField);

    return (
      <>
        {loaded ? (
          <div className="App">
            <h1>
              {searchCountries.length === 0
                ? "No Country"
                : searchCountries.length === 1
                ? "1 Country"
                : `${searchCountries.length} Countries`}
            </h1>

            <SearchBox
              placeholder="search countries by name or capital"
              handleChange={this.handleChange}
            ></SearchBox>

            <ModalBox
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal"
            >
              <CountryDetails countries={countries} countryName={countryName} />
            </ModalBox>
            <Switch>
              <Route path="/" render={this.CardListContainer} />;
            </Switch>
            <PaginationBar
              filteredCountries={searchCountries}
              showPrevPage={this.showPrevPage}
              showNextPage={this.showNextPage}
              getPageNumbers={this.getPageNumbers}
            />
          </div>
        ) : (
          <div className="loader">
            <img src={loaderIcon} alt="World loader" />
          </div>
        )}
      </>
    );
  }
}

export default App;
