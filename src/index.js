import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PhotoState from "./context/photo/PhotoState";

ReactDOM.render(
  <PhotoState>
    <App />
  </PhotoState>,
  document.getElementById("root")
);
