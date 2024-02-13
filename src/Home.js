import React from "react";
import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
import { useSelector, useDispatch } from "react-redux";

import { setWeather } from "./redux/Weather.js";
import { Link } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const { weather } = useSelector((state) => state.weather);
  const [city, setCity] = useState("Paris");
  const [weather1, setWeather1] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      dispatch(setWeather(data));
      // dynamic bg
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };
    fetchWeatherData();
  }, [units, city]);
  const fetchWeatherData1 = async () => {
    const data = await getFormattedWeatherData(city, units);
    dispatch(setWeather(data));
    // dynamic bg
    const threshold = units === "metric" ? 20 : 60;
    if (data.temp <= threshold) setBg(coldBg);
    else setBg(hotBg);
  };
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={() => fetchWeatherData1()}>Search</button>
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            <div>
              <Link to="/details" state={city}>
                <button className="button2">More Details</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
