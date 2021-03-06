import React, { useContext } from "react";
import { MarkerClusterer } from "@react-google-maps/api";
import PhotoMarker from "./PhotoMarker";
import PhotoContext from "../../context/photo/photoContext";

/**
 *
 * Component for clusters of markers that are displayed at low zoom levels.  On clicking, a photo drawer is displayed with all the photos associated with the cluster shown as a collage.
 */

export const PhotoClusterer = () => {
  const photoContext = useContext(PhotoContext);
  const {
    setSelectedPhotos,
    togglePhotoContainer,
    filteredPhotos,
  } = photoContext;

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  };

  const handleClick = (evt) => {
    const clusterPhotos = evt.markers.map((marker) => {
      return filteredPhotos.find(
        (photo) =>
          photo.GPSLat === marker.position.lat() &&
          photo.GPSLng === marker.position.lng()
      );
    });

    setSelectedPhotos(clusterPhotos);
    togglePhotoContainer(true);
  };

  return (
    <MarkerClusterer
      options={options}
      zoomOnClick={false}
      onClick={(evt) => handleClick(evt)}
    >
      {(clusterer) =>
        filteredPhotos.map((photo) => (
          <PhotoMarker
            key={photo.File}
            photo={photo}
            position={{ lat: photo.GPSLat, lng: photo.GPSLng }}
            clusterer={clusterer}
          />
        ))
      }
    </MarkerClusterer>
  );
};

export default PhotoClusterer;
