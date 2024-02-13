import { createSlice } from "@reduxjs/toolkit";

export const Weather = createSlice({
  name: "weather",
  initialState: {
    weather: null,
  },
  reducers: {
    setWeather: (state, action) => {
      state.weather = action.payload;
    },
  },
});

export const { setWeather } = Weather.actions;
