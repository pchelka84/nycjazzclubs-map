import React, { Component } from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Map from "./components/Map";
import SquareAPI from "./API/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: { lat: 40.7413549, lng: -73.9980244 },
      zoom: 13
    };
  }
  componentDidMount() {
    SquareAPI.search({
      near: "New York, NY",
      query: "jazz club",
      limit: 10,
      intent: "browse",
      radius: 5000
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true
        };
      });
      this.setState({ venues, center, markers });
      console.log(results);
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Map {...this.state} />
      </div>
    );
  }
}

export default App;
