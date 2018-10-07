import React, { Component } from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Map from "./components/Map";
import SquareAPI from "./API/";

class App extends Component {
  componentDidMount() {
    this.renderMap();
    SquareAPI.search({
      near: "New York, NY",
      query: "jazz",
      limit: 17
    }).then(results => console.log(results));
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCSKl3k11WqXkK_gCkTNcaSfEdCt3Oo-LQ&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    // Create a map
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.7413549, lng: -73.9980244 },
      zoom: 13
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <Map />
      </div>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
