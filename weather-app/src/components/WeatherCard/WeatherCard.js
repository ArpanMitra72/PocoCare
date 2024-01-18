import React from "react";
import PropTypes from "prop-types";
import "./WeatherCard.css";

const WeatherCard = ({ day, temperatureMin, temperatureMax, weatherType }) => {
  const getWeatherIcon = (type) => {
    const weatherCondition = type?.toLowerCase();
    const iconSize = "24px";
    switch (weatherCondition) {
      case "clear":
        return (
          <img
            src={require(`../../Assets/clear.png`)}
            alt="Sun"
            style={{ width: iconSize, height: iconSize }}
          />
        );
      case "clouds":
        return (
          <img
            src={require(`../../Assets/cloudy.png`)}
            alt="Cloudy"
            style={{ width: iconSize, height: iconSize }}
          />
        );
      case "rain":
        return (
          <img
            src={require(`../../Assets/raining.png`)}
            alt="Raining"
            style={{ width: iconSize, height: iconSize }}
          />
        );
      case "snow":
        return (
          <img
            src={require(`../../Assets/snow.png`)}
            alt="Snow"
            style={{ width: iconSize, height: iconSize }}
          />
        );
      case "mist":
        return (
          <img
            src={require(`../../Assets/fog.png`)}
            alt="Fog"
            style={{ width: iconSize, height: iconSize }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="weather-card">
      <div className="day">{day}</div>
      <div className="temperature">
        {temperatureMin !== undefined &&
          temperatureMax !== undefined &&
          day !== undefined &&
          `${temperatureMin}°  ${temperatureMax}°`}
      </div>
      <div className="weather-type">
        {getWeatherIcon(weatherType)}
        <br />
        {weatherType}
      </div>
    </div>
  );
};

export default WeatherCard;
