import React, { Component } from "react";
import "./Map.css";

import SideBar from "./SideBar";

/* global google */

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

// Listening for authentication errors
window.gm_authFailure = () => {
  alert(
    "Somethig went wrong with Google API key. Please check Google API credentials."
  );
};

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      zoom={props.zoom}
      center={props.center}
      defaultCenter={{ lat: 40.7828647, lng: -73.9653551 }}
    >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, idx, arr) => {
            const venueDetails = props.venues.find(
              venue => venue.id === marker.id
            );

            let name = venueDetails.name;
            let address = venueDetails.location.address;
            let city = venueDetails.location.city;
            let state = venueDetails.location.state;
            let zipcode = venueDetails.location.postalCode;
            let rating = "";
            let photo = "";
            if (venueDetails.bestPhoto) {
              photo = `${venueDetails.bestPhoto.prefix}150x110${
                venueDetails.bestPhoto.suffix
              }`;
            } else {
              photo = `${venueDetails.categories[0].icon.prefix}32${
                venueDetails.categories[0].icon.suffix
              }`;
            }
            if (venueDetails.rating) {
              rating = venueDetails.rating;
            } else {
              rating = "Not rated yet";
            }

            return (
              <Marker
                key={idx}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => props.handleMarkerClick(marker)}
                animation={
                  arr.length === 1
                    ? google.maps.Animation.BOUNCE
                    : google.maps.Animation.DROP
                }
              >
                {marker.isOpen &&
                  venueDetails.location && (
                    <InfoWindow>
                      <div className="infowindow">
                        <h3 className="title-infowindow text-center pt-1">
                          {name}
                        </h3>
                        <div className="infowindow-image bg-info">
                          <img
                            src={photo}
                            alt={venueDetails.categories[0].name}
                          />
                        </div>
                        <p>
                          <strong>Address:</strong> {address}
                          <br />
                          {city}, {state} {zipcode}
                        </p>

                        <p>
                          <strong>Rating:</strong> {rating}
                        </p>
                        <span className="attribution">
                          Powered by
                          <a href="https://www.foursquare.com" rel="nofollow">
                            Foursquare
                          </a>
                        </span>
                      </div>
                    </InfoWindow>
                  )}
              </Marker>
            );
          })}
    </GoogleMap>
  ))
);

class Map extends Component {
  render() {
    return (
      <main>
        <SideBar {...this.props} />
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
