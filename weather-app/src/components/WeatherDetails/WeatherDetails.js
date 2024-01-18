import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./WeatherDetails.css";
import clearImage from "../../Assets/clear.png";
import cloudyImage from "../../Assets/cloudy.png";
import rainingImage from "../../Assets/raining.png";
import snowImage from "../../Assets/snow.png";
import mistImage from "../../Assets/fog.png";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const WeatherDetails = ({
  temperatureData,
  pressure,
  humidity,
  sunrise,
  sunset,
  weatherIcons,
}) => {
  const toCelsius = (temperature) => temperature - 273.15;
  const [chartData, setChartData] = useState({
    labels: temperatureData.map((_, index) => index),
    datasets: [{ data: temperatureData.map(toCelsius) }],
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTemperatureData = [...temperatureData];

      setChartData({
        labels: newTemperatureData.map((_, index) => index),
        datasets: [{ data: newTemperatureData.map(toCelsius) }],
      });
    }, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, [temperatureData]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const startTime = new Date(sunrise * 1000);
  startTime.setHours(9, 0, 0, 0);

  const temperatureChartOptions = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 1, // Every label represents one hour
          callback: (value, index) => {
            // Display the time for each label
            const time = new Date(startTime.getTime() + index * 60 * 60 * 1000);
            return formatTime(time.getTime() / 1000);
          },
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        ticks: {
          callback: (value) => `${Math.round(value)}°C`,
        },
      },
    },
  };
  const renderHourlyTemperatureCards = () => {
    return temperatureData.map((temperature, index) => {
      const time = new Date(startTime.getTime() + index * 60 * 60 * 1000);
      const weatherType = weatherIcons[index]?.toLowerCase() || "unknown";
      let iconImage;
      switch (weatherType) {
        case "clear":
          iconImage = clearImage;
          break;
        case "cloudy":
          iconImage = cloudyImage;
          break;
        case "raining":
          iconImage = rainingImage;
          break;
        case "snow":
          iconImage = snowImage;
          break;
        case "mist":
          iconImage = mistImage;
          break;
        default:
          return null;
      }
      return (
        <div key={index} className="hourly-temperature-card">
          <img src={iconImage} alt="Weather Icon" />
          <p>{formatTime(time.getTime() / 1000)}</p>
          <h3>{Math.round(temperature - 273.15)}°C</h3>
        </div>
      );
    });
  };
  return (
    <div className="weather-details">
      {/* Display current temperature and weather icon */}
      <div className="temperature-chart">
        {temperatureData.length > 0 && (
          <div className="current-weather">
            <h1>{Math.round(toCelsius(temperatureData[0]))}°C</h1>
            <div className="hourly-temperature-cards">
              {renderHourlyTemperatureCards()}
            </div>
          </div>
        )}
        {/* Display the temperature chart */}
        <Line data={chartData} options={temperatureChartOptions} />
      </div>
      {/* Display pressure and humidity */}
      <div className="display-box">
        <div className="pressure-humidity-block">
          <div className="pressure">
            <h3 className="heading">Pressure:</h3>
            <br />
            <p className="value">{pressure} hPa</p>
          </div>
          <div className="humidity">
            <h3 className="heading">Humidity: </h3>
            <br />
            <p className="value">{humidity}%</p>
          </div>
        </div>

        {/* Display sunrise and sunset timings */}
        <div className="sunrise-sunset-chart">
          <div className="sunrise-sunset-time">
            <div>
              <h3 className="heading">Sunrise:</h3>
              <br />
              <p className="value">{formatTime(sunrise)}</p>
            </div>
            <div>
              <h3 className="heading">Sunset:</h3>
              <br />
              <p className="value">{formatTime(sunset)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
