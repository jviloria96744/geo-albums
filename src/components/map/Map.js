import React, { useContext } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import PhotoClusterer from "./PhotoClusterer";
import PhotoContext from "../../context/photo/photoContext";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const Map = () => {
  const photoContext = useContext(PhotoContext);

  const { filteredPhotos } = photoContext;
  const center =
    filteredPhotos.length === 0
      ? { lat: 33.697, lng: -117.888 }
      : { lat: filteredPhotos[0].GPSLat, lng: filteredPhotos[0].GPSLng };

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
