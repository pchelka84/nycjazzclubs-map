import React, { Component } from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Map from "./components/Map";
import SquareAPI from "./API/";

class App extends Component {
  componentDidMount() {
    SquareAPI.search({
      near: "New York, NY",
      query: "jazz",
      limit: 17
    }).then(results => console.log(results));
  }

  render() {
    return (
      <div>
        <NavBar />
        <Map />
      </div>
    );
  }
}

export default App;
