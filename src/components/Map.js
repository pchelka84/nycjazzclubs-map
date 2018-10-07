import React, { Component } from "react";
import "./Map.css";

import SideBar from "./SideBar";

class Map extends Component {
  // state = {
  //   venues: []
  // };

  render() {
    return (
      <main>
        <SideBar />
        <div id="map" />
      </main>
    );
  }
}

export default Map;
