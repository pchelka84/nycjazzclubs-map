import React, { Component } from "react";
import "./Map.css";

import SideBar from "./SideBar";
import SquareAPI from "../API/";

import axios from "axios";

class Map extends Component {
  state = {
    venues: []
  };

  componentDidMount() {
    this.getVenues();
    SquareAPI.search({
      near: "New York, NY",
      query: "jazz",
      limit: 17
    }).then(results => console.log(results));
  }

  initMap = () => {
    // Create a map
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.7413549, lng: -73.9980244 },
      zoom: 13
    });

    // Create an InfoWindow
    var infowindow = new window.google.maps.InfoWindow();

    // Display dynamic markers
    this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}`;

      // Create a marker
      var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: myVenue.venue.name
      });

      // Click on a marker
      marker.addListener("click", function() {
        // Change content
        infowindow.setContent(contentString);
        // Open an InfoWindow
        infowindow.open(map, marker);
      });
    });
  };

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "VMTRPTW1INEDWY1XBEBCGXQMWKT15JJOI22XOX1NX15HOKWV",
      client_secret: "FWESS4RSP43RA1SARGVZFPC0SJRYEG4QSUYKS345CFFF5MFY",
      intent: "browse",
      query: "jazz",
      near: "New York",
      limit: 13,
      v: "20181001"
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response.data.response.groups[0].items);
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
        <SideBar />
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

export default Map;
