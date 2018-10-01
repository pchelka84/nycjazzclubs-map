import React, { Component } from "react";
import "./App.css";

import axios from "axios";

class App extends Component {
  state = {
    venues: []
  };

  componentDidMount() {
    this.getVenues();
    this.renderMap();
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.7127753, lng: -74.0059728 },
      zoom: 12
    });

    var marker = new window.google.maps.Marker({
      position: { lat: 40.7127753, lng: -74.0059728 },
      map: map,
      title: "Hello World!"
    });
  };

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "VMTRPTW1INEDWY1XBEBCGXQMWKT15JJOI22XOX1NX15HOKWV",
      client_secret: "FWESS4RSP43RA1SARGVZFPC0SJRYEG4QSUYKS345CFFF5MFY",
      query: "coffee",
      near: "New York",
      v: "20181001"
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            venues: response.data.response.groups[0].items
          },
          this.renderMap()
        );
      })
      .catch(error => {
        console.log("ERROR!! " + error);
      });
  };

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCSKl3k11WqXkK_gCkTNcaSfEdCt3Oo-LQ&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  render() {
    return (
      <main>
        <div id="map" />
      </main>
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
