import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Marker } from "@react-google-maps/api";
import PhotoContext from "../../context/photo/photoContext";

export const PhotoMarker = ({ photo, clusterer }) => {
  const photoContext = useContext(PhotoContext);

  const { togglePhotoContainer, setSelectedMarkers } = photoContext;

  const handleClick = (isOpen) => {
    setSelectedMarkers([photo]);
    togglePhotoContainer(isOpen);
  };

  return (
    <Fragment>
      <Marker
        position={{ lat: photo.GPSLat, lng: photo.GPSLng }}
        clusterer={clusterer}
        onClick={() => handleClick(true)}
      />
    </Fragment>
  );
};

PhotoMarker.propTypes = {
  photo: PropTypes.object.isRequired,
  clusterer: PropTypes.object.isRequired,
};
export default PhotoMarker;
