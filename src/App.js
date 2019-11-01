import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/searchbox/search-box.component";

import { filterUtil } from "./utils";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchField: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ users: users }));
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value.toLowerCase() });
  };

  render() {
    const { users, searchField } = this.state;

    const filteredUsers = users.filter(user => {
      const { name, username } = user;
      return filterUtil(name, searchField) || filterUtil(username, searchField);
    });

    return (
      <div className="App">
        <h1> User Cards</h1>
        <SearchBox
          placeholder="search users"
          handleChange={this.handleChange}
        ></SearchBox>
        <CardList users={filteredUsers}></CardList>
      </div>
    );
  }
}

export default App;
