import React, { Component } from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Map from "./components/Map";
import SquareAPI from "./API/";

import RedPin from "./components/images/redpin.png";
import BluePin from "./components/images/bluepin.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  // Change markers state to default
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.icon = RedPin;
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.icon = BluePin;
    marker.isOpen = true;
    // Assign marker and its properties to markers
    this.setState({ markers: Object.assign(this.state.markers, marker) });

    const venue = this.state.venues.find(venue => venue.id === marker.id);

    // Get venue details for a marker
    SquareAPI.getVenueDetails(marker.id).then(response => {
      const newVenue = Object.assign(venue, response.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      console.log(newVenue);
    });
  };

  // Open corresponding marker when a list item is clicked
  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    this.setState({ center: { lat: marker.lat, lng: marker.lng } });
    // console.log(venue);
  };

  componentDidMount() {
    SquareAPI.search({
      near: "New York, NY",
      query: "jazz",
      limit: 17,
      intent: "browse",
      radius: 5000
    })
      // Pull info from response
      .then(results => {
        const { venues } = results.response;
        const { center } = results.response.geocode.feature.geometry;
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: venue.id,
            icon: RedPin
          };
        });
        this.setState({ venues, center, markers });
        console.log(results);
      })
      .catch(error => {
        alert(
          "There was an error retrieving information from FourSquare API. Please try again later."
        );
        console.log(error);
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
          closeAllMarkers={this.closeAllMarkers}
        />
      </div>
    );
  }
}

export default App;
