import React, { Component } from "react";
import "./ListItem.css";

class ListItem extends Component {
  render() {
    return <li>{this.props.name}</li>;
  }
}

export default ListItem;
