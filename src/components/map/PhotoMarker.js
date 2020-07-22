import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Marker } from "@react-google-maps/api";
import PhotoContext from "../../context/photo/photoContext";

/**
 *
 * Component for individual markers that are displayed at any zoom levels.  On clicking, a photo drawer is displayed that shows the photo associated with this map marker.
 */

export const PhotoMarker = ({ photo, clusterer }) => {
  const photoContext = useContext(PhotoContext);

  const { togglePhotoContainer, setSelectedPhotos } = photoContext;

  const handleClick = (isOpen) => {
    setSelectedPhotos([photo]);
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
  /**
   * Photo object containing photo ID to access it from S3 bucket, as well as Lat/Lng properties to place Marker on map
   */
  photo: PropTypes.object.isRequired,
  /**
   * clusterer object for photo clustering functionality
   */
  clusterer: PropTypes.object.isRequired,
};

export default PhotoMarker;
