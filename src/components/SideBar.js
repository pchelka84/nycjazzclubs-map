import React, { Component } from "react";
import "./SideBar.css";
import VenueList from "./VenueList";

class SideBar extends Component {
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
