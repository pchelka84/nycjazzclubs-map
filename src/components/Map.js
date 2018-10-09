import React, { Component } from "react";
import "./Map.css";

import SideBar from "./SideBar";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      zoom={props.zoom}
      center={props.center}
      defaultCenter={{ lat: 40.7413549, lng: -73.9980244 }}
    >
      {props.markers &&
        props.markers.filter(marker => marker.isVisible).map((marker, idx) => (
          <Marker
            key={idx}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.handleMarkerClick(marker)}
          >
            {marker.isOpen && (
              <InfoWindow>
                <p>Infowindow content</p>
              </InfoWindow>
            )}
          </Marker>
        ))}
    </GoogleMap>
  ))
);

class Map extends Component {
  render() {
    return (
      <main>
        <SideBar />
        <MyMapComponent
          {...this.props}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCSKl3k11WqXkK_gCkTNcaSfEdCt3Oo-LQ"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </main>
    );
  }
}

export default Map;
