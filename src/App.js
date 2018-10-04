import React, { Component } from "react";
import "./App.css";

import axios from "axios";

class App extends Component {
  state = {
    venues: []
  };

  componentDidMount() {
    this.getVenues();
    // this.renderMap();
  }

  initMap = () => {
    // Create a map
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.7127753, lng: -74.0059728 },
      zoom: 14
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
        title: myVenue.venue.name
      });

      // Click on a marker
      marker.addListener("click", function() {
        // Change a content
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
      query: "coffee",
      near: "New York",
      limit: 10,
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
      <div>
        <nav className="navbar navbar-dark fixed-top bg-info">
          <div className="navbar-header">
            <button
              className="btn btn-info mr-3 p-2"
              onClick={e => {
                const sidebar = document.querySelector(".sidebar");
                e.preventDefault();
                sidebar.classList.toggle("close");
              }}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <h3 className="navbar-brand pt-1">New York City Jazz Clubs</h3>
          </div>
        </nav>
        <main>
          <div className="sidebar p-3 bg-light m-0">
            <span
              className="sidebar-close pt-3 float-right"
              onClick={() => {
                const sidebar = document.querySelector(".sidebar");
                sidebar.classList.add("close");
              }}
            >
              <i className="fas fa-times-circle" />
            </span>

            <div className="sidebar-header pt-3">
              <h3>Venues</h3>
            </div>

            <div class="input-group input-group-sm mt-3 mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">
                  Filter
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                // aria-label="Filter"
                // aria-describedby="Filter"
              />
            </div>

            <nav id="sidebar">
              <ul className="list-unstyled">
                <li>Jazz Club 1</li>
                <li>Jazz Club 2</li>
                <li>Jazz Club 3</li>
                <li>Jazz Club 4</li>
                <li>Jazz Club 5</li>
              </ul>
            </nav>
          </div>
          <div id="map" />
        </main>
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
