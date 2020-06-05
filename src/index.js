import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FilterState from "./context/filter/FilterState";

ReactDOM.render(
  <FilterState>
    <App />
  </FilterState>,
  document.getElementById("root")
);
