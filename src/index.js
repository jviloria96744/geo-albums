import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FilterState from "./context/filter/FilterState";
import PhotoState from "./context/photo/PhotoState";

ReactDOM.render(
  <PhotoState>
    <FilterState>
      <App />
    </FilterState>
  </PhotoState>,
  document.getElementById("root")
);
