import { lastfm } from "./js/lastfm.api.js";
import { axios } from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom";
const fetch = require("node-fetch");
const getChart = async () => {
  const response = await axios.get("./lastfm.api.js");
  setBooks(response.data);
};
export { getChart };
