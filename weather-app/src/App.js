import React from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
// import Loader from "./components/Loader";

function App() {
  return (
    <div className="App">
      <SearchBar />
      {/* <Loader /> */}
      <WeatherCard />
    </div>
  );
}

export default App;
