import React, { Component } from "react";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-info">
        <div className="navbar-header">
          <button
            className="btn btn-info mr-3 p-2"
            onClick={e => {
              const sidebar = document.querySelector(".sidebar");
              e.preventDefault();
              sidebar.classList.toggle("close");
            }}
            type="button"
            aria-expanded="true"
            aria-label="Toggle sidemenu"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <h3 className="navbar-brand pt-1">New York City Jazz Venues</h3>
        </div>
      </nav>
    );
  }
}

export default NavBar;
