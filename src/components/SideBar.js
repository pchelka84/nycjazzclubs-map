import React, { Component } from "react";
import "./SideBar.css";
import VenueList from "./VenueList";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: ""
    };
  }

  handleFilterVenues = () => {};

  handleChange = e => {
    this.props.closeAllMarkers();
    this.setState({ query: e.target.value });
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.marker.find(marker => marker.id === venue.id);
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

        <div className="input-group input-group-sm mt-3 mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Filter
            </span>
          </div>
          <input
            type={"search"}
            id={"search"}
            placeholder={"Filter Venues"}
            className="form-control"
            onChange={this.handleChange}
            // aria-label="Filter"
            // aria-describedby="Filter"
          />
        </div>

        <VenueList {...this.props} />
      </div>
    );
  }
}

export default SideBar;
