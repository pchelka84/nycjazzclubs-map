import React, { Component } from "react";
import "./SideBar.css";

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
            type="text"
            className="form-control"
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
    );
  }
}

export default SideBar;
