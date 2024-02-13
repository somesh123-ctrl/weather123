import React from "react";
import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpeg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
import { useSelector, useDispatch } from "react-redux";

import { setWeather } from "./redux/Weather.js";
import { useLocation } from "react-router-dom";
const Details = () => {
  const { weather } = useSelector((state) => state.weather);

  const [weather1, setWeather1] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);
  const location = useLocation();
  const city = location.state;
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather1(data);

      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather1 && (
          <div className="container">
            <h3 className="label1">Click Here:⬇️</h3>{" "}
            <button onClick={(e) => handleUnitsClick(e)} className="button1">
              °F
            </button>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather1.name}, ${weather1.country}`}</h3>
                <img src={weather1.iconURL} alt="weatherIcon" />
                <h3>{weather1.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather1.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            <Descriptions weather={weather1} units={units} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
