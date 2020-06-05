import React from "react";
import Map from "./components/map/Map";
import FilterDrawer from "./components/filter/FilterDrawer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Map />
      <FilterDrawer />
    </div>
  );
}

export default App;
