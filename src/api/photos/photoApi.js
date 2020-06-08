import axios from "axios";

export const photoApi = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});
