import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import WeatherCard from "../WeatherCard/WeatherCard";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import CitySuggestion from "../CitySuggestion/CitySuggestion";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcons, setWeatherIcons] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const apiKey = "267ee5ea0f2aafce890a3affc42f4c2c";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}`
        );
        const weatherIcons = response.data.list.map((forecast) => {
          const weatherType =
            forecast.weather[0]?.main.toLowerCase() || "unknown";
          return `${weatherType}.png`;
        });

        setWeatherData(response.data);
        setWeatherIcons(weatherIcons);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    if (query.trim() !== "") {
      fetchCities();
    } else {
      setCities([]);
      setWeatherData(null);
    }
  }, [query]);

  const handleSearch = async () => {};

  const getDayOfWeek = (timestamp) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  };

  const filterWeatherData = (weatherList) => {
    const uniqueDays = [];
    return weatherList.filter((forecast) => {
      const day = getDayOfWeek(forecast.dt);
      if (!uniqueDays.includes(day)) {
        uniqueDays.push(day);
        return true;
      }
      return false;
    });
  };

  const handleSelectCity = (selectedCity) => {
    setQuery(`${selectedCity.name}, ${selectedCity.sys.country}`);
    setCities([]); // Clear the city suggestions
    setSelectedCity(selectedCity);
    fetchWeatherData(selectedCity.id);
  };
  const fetchWeatherData = async (cityId) => {
    try {
      const apiKey = "267ee5ea0f2aafce890a3affc42f4c2c";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?id=${cityId}&appid=${apiKey}`
      );

      setWeatherData(response.data);
      setCities(filterWeatherData(response.data.list));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchCitySuggestions = async () => {
    try {
      const apiKey = "267ee5ea0f2aafce890a3affc42f4c2c";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}`
      );

      setCities(response.data.list);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };
  useEffect(() => {
    if (query.trim() !== "") {
      fetchCitySuggestions();
    } else {
      setCities([]);
      setWeatherData(null);
    }
  }, [query]);

  return (
    <div className="search-bar">
      <div className="search-input">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="search-icon" />
        <input
          type="text"
          placeholder="Search for cities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon"
          onClick={handleSearch}
        />
      </div>
      {cities.length > 0 && (
        <div className="city-dropdown">
          {cities.map((city) => (
            <CitySuggestion
              key={city.id}
              city={city}
              temperature={Math.round(city.main.temp - 273.15) || 0}
              weatherType={city.weather[0]?.main || "Unknown"}
              onSelect={handleSelectCity}
            />
          ))}
        </div>
      )}
      {weatherData !== null && weatherData.list && (
        <div className="weather-cards">
          <div className="weather-scroll-container">
            {weatherData.list
              .reduce((uniqueDays, forecast, index) => {
                const day = getDayOfWeek(forecast.dt);
                if (!uniqueDays.includes(day)) {
                  uniqueDays.push(day);
                  return [
                    ...uniqueDays,
                    <WeatherCard
                      key={index}
                      day={day}
                      temperatureMin={
                        Math.round(forecast.main.temp_min - 273.15) || 0
                      }
                      temperatureMax={
                        Math.round(forecast.main.temp_max - 273.15) || 0
                      }
                      weatherType={forecast.weather[0]?.main || "Unknown"}
                    />,
                  ];
                }
                return uniqueDays;
              }, [])
              .filter(
                (day) =>
                  day !== "Sun" &&
                  day !== "Mon" &&
                  day !== "Tue" &&
                  day !== "Wed" &&
                  day !== "Thu" &&
                  day !== "Fri" &&
                  day !== "Sat"
              )}
          </div>
        </div>
      )}
      {weatherData !== null && weatherData.list && (
        <>
          <WeatherDetails
            temperatureData={weatherData.list.map(
              (forecast) => forecast.main.temp
            )}
            pressure={weatherData.list[0].main.pressure}
            humidity={weatherData.list[0].main.humidity}
            sunrise={weatherData.city.sunrise}
            sunset={weatherData.city.sunset}
            weatherIcons={weatherIcons}
          />
        </>
      )}
    </div>
  );
};

export default SearchBar;
