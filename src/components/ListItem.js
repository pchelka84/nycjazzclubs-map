import React, { Component } from "react";
import "./ListItem.css";

class ListItem extends Component {
  render() {
    return (
      <li tabIndex="0" role="button" onClick={() => this.props.handleListItemClick(this.props)}>
        {this.props.name}
      </li>
    );
  }
}

export default ListItem;
