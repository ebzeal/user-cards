import React, { Component } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { CardList } from "./components/card-list/card-list.component";
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
      .then(countries => this.setState({ countries: countries }))
      .then(loaded => this.setState({ loaded: true }));
  }

  handleChange = e => {
    this.setState({
      page: 1,
      searchField: e.target.value.toLowerCase()
    });
  };

  getPageNumbers = (countryNumber = 200) => {
    const numberOfPages = Math.ceil(countryNumber / 20);
    let pageNumbers = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pageNumbers.push(`${i}`);
    }
    return pageNumbers.map(number => {
      return (
        <Router>
          <Switch>
            <i className="pagesNumbered">
              <Link to={`?page=${number}`}> {number} </Link>
              {/* <Route path={`/`} component={<CardList />} /> */}
            </i>
          </Switch>
        </Router>
      );
    });
  };

  showPrevPage = () => {
    const statePage = this.state.page;
    return statePage === 1 ? "" : this.setState({ page: statePage - 1 });
  };

  showNextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  getCountry = val => {
    this.setState({
      countryName: val
    });
  };

  render() {
    const { countries, searchField, loaded, page, countryName } = this.state;

    const filteredCountries = countries.filter(country => {
      const { name, capital } = country;
      return filterUtil(name, searchField) || filterUtil(capital, searchField);
    });

    return (
      <>
        {loaded ? (
          <div className="App">
            <h1>
              {filteredCountries.length === 0
                ? "No Country"
                : filteredCountries.length === 1
                ? "1 Country"
                : `${filteredCountries.length} Countries`}
            </h1>

            <SearchBox
              placeholder="search countries by name or capital"
              handleChange={this.handleChange}
            ></SearchBox>
            <CardList
              countries={filteredCountries}
              page={page}
              openModal={this.openModal}
              countryName={this.getCountry}
            />

            <ModalBox
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal"
            >
              <CountryDetails countries={countries} countryName={countryName} />
            </ModalBox>

            <PaginationBar
              filteredCountries={filteredCountries}
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
