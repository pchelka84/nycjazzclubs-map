import React, { Component } from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Map from "./components/Map";
import SquareAPI from "./API/";
// import icon from "./components/images/saxophone.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: { lat: 40.7413549, lng: -73.9980244 },
      zoom: 13,
      updateSuperState: obj => {
        this.setState(obj);
      }
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
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(response => {
      const newVenue = Object.assign(venue, response.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      console.log(newVenue);
    });
    // .catch(error => {
    //   alert(
    //     "There was an error retrieving information from our API. Please try again later. Sorry! 1"
    //   );
    // });
  };

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
      .then(results => {
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
      })
      .catch(error => {
        alert(
          "There was an error retrieving information from FourSquare API. Please check FourSquare API credentials and try again."
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
