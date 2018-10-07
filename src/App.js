import React, { Component } from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Map from "./components/Map";

// import axios from "axios";

class App extends Component {
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
