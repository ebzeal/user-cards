import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/searchbox/search-box.component";
import PaginationBar from "./components/pagination/paginationBar";

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
      page: 1
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
      pageNumbers.push(` ${i} `);
    }
    return pageNumbers;
  };

  showPrevPage = () => {
    const statePage = this.state.page;
    return statePage === 1 ? "" : this.setState({ page: statePage - 1 });
  };

  showNextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { countries, searchField, loaded, page } = this.state;

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
              placeholder="search countries"
              handleChange={this.handleChange}
            ></SearchBox>
            <CardList countries={filteredCountries} page={page}></CardList>
            <div>
              <p></p>
              <i
                class="fa fa-arrow-left"
                aria-hidden="true"
                onClick={this.showPrevPage}
              ></i>
              {this.getPageNumbers(filteredCountries.length)}

              <i
                class="fa fa-arrow-right"
                aria-hidden="true"
                onClick={this.showNextPage}
              ></i>
            </div>
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
