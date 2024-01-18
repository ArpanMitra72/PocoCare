import React from "react";
import "./CitySuggestion.css";

const CitySuggestion = ({ city, temperature, weatherType, onSelect }) => {
  const getWeatherIcon = () => {
    const iconSize = "24px";
    switch (weatherType.toLowerCase()) {
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
  const handleSelect = () => {
    onSelect(city);
  };
  return (
    <div className="city-suggestion" onClick={handleSelect}>
      <div className="city-info">
        <span className="city-name">
          {city.name},{city.sys.country}
        </span>
      </div>
      <div className="weather-info">
        <div className="weather-thing">
          <span className="temperature">{temperature}°C</span>
          <span className="weather-type">{weatherType}</span>
        </div>
        {getWeatherIcon()}
      </div>
    </div>
  );
};

export default CitySuggestion;
