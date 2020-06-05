import React, { useContext } from "react";
import { MarkerClusterer } from "@react-google-maps/api";
import PhotoMarker from "./PhotoMarker";
import FilterContext from "../../context/filter/filterContext";
import PhotoContext from "../../context/photo/photoContext";

export const PhotoClusterer = () => {
  const filterContext = useContext(FilterContext);
  const photoContext = useContext(PhotoContext);

  const { filteredPhotos } = filterContext;
  const { setSelectedPhotos, togglePhotoContainer } = photoContext;

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
