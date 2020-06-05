import React, { useContext } from "react";
import { GoogleMap, LoadScript, MarkerClusterer } from "@react-google-maps/api";
import PhotoMarker from "./PhotoMarker";
import FilterContext from "../../context/filter/filterContext";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

const Map = () => {
  const filterContext = useContext(FilterContext);

  const { filteredPhotos } = filterContext;
  const center = {
    lat:
      filteredPhotos.length === 0
        ? 33.69780731201172
        : filteredPhotos[0].GPSLat,
    lng:
      filteredPhotos.length === 0
        ? -117.88880920410156
        : filteredPhotos[0].GPSLng,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
        <MarkerClusterer options={options}>
          {(clusterer) =>
            filterContext.filteredPhotos.map((photo) => (
              <PhotoMarker
                key={photo.File}
                photoUrl={photo.File}
                position={{ lat: photo.GPSLat, lng: photo.GPSLng }}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
