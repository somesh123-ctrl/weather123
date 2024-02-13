import { configureStore } from "@reduxjs/toolkit";
import { Weather } from "./Weather.js";

export default configureStore({
  reducer: {
    weather: Weather.reducer,
  },
});
