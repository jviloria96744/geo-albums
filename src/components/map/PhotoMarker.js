import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Marker } from "@react-google-maps/api";
import PhotoDrawer from "../photos/PhotoDrawer";

export const PhotoMarker = ({ photoUrl, position, clusterer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (state) => {
    setIsOpen(state);
  };
  return (
    <Fragment>
      <Marker
        position={{ lat: position.lat, lng: position.lng }}
        clusterer={clusterer}
        onClick={() => toggleDrawer(true)}
      />
      <PhotoDrawer
        photoUrl={photoUrl}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      />
    </Fragment>
  );
};

PhotoMarker.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  clusterer: PropTypes.object.isRequired,
};
export default PhotoMarker;
