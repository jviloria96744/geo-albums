import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PhotoState from "./context/photo/PhotoState";
import UserState from "./context/user/UserState";

ReactDOM.render(
  <PhotoState>
    <UserState>
      <App />
    </UserState>
  </PhotoState>,
  document.getElementById("root")
);
