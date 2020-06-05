import React from "react";
import Map from "./components/map/Map";
import FilterDrawer from "./components/filter/FilterDrawer";
import PhotoContainer from "./components/photos/PhotoContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Map />
      <FilterDrawer />
      <PhotoContainer />
    </div>
  );
}

export default App;
