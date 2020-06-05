import React, { useContext } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import PhotoClusterer from "./PhotoClusterer";
import FilterContext from "../../context/filter/filterContext";

const containerStyle = {
  width: "100vw",
  height: "100vh",
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

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        options={options}
      >
        <PhotoClusterer />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
