import React from "react";
import Map from "./components/map/Map";
import WebDrawer from "./components/layout/WebDrawer";
import PhotoContainer from "./components/photos/PhotoContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Map />
      <WebDrawer />
      <PhotoContainer />
    </div>
  );
}

export default App;
