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
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ marker: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      console.log(newVenue);
    });
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    // console.log(venue);
  };

  componentDidMount() {
    SquareAPI.search({
      near: "New York, NY",
      query: "jazz",
      limit: 17,
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
          isVisible: true,
          id: venue.id
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
        <Map
          {...this.state}
          handleMarkerClick={this.handleMarkerClick}
          handleListItemClick={this.handleListItemClick}
        />
      </div>
    );
  }
}

export default App;
