import axios from "axios";

export const photoApi = axios.create({
  baseURL: "https://4j48yielsl.execute-api.us-west-2.amazonaws.com/DEV",
  headers: {
    "x-api-key": process.env.REACT_APP_APIGW_KEY,
  },
});
