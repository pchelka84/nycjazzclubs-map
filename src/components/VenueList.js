import React, { Component } from "react";
import "./VenueList.css";
import ListItem from "./ListItem";

class VenueList extends Component {
  render() {
    return (
      <div>
        <nav id="sidebar">
          <ul className="list-unstyled">
            {this.props.venues &&
              this.props.venues.map((venue, idx) => (
                <ListItem key={idx} {...venue} />
              ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default VenueList;
