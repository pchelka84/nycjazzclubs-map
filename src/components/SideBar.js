import React, { Component } from "react";
import "./SideBar.css";
import VenueList from "./VenueList";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      venues: []
    };
  }

  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };

  handleChange = e => {
    this.props.closeAllMarkers();
    this.setState({ query: e.target.value });
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers: markers });
  };

  render() {
    return (
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

        <input
          type={"search"}
          id={"search"}
          placeholder={"Filter Venues"}
          className="form-control mt-3 mb-3"
          onChange={this.handleChange}
          // aria-label="Filter"
          // aria-describedby="Filter"
        />

        <VenueList {...this.props} venues={this.handleFilterVenues()} />
      </div>
    );
  }
}

export default SideBar;
