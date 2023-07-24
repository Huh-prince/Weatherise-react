import React, { useState } from "react";
import "./index.css";
import "./app.css";

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "b2cb5be87162c62406fe3c78c473e3ab",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(weather);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Novmber",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="dabba">
       <div
      className={
        typeof weather.main !== "undefined"
          ? weather.weather[0].main === "Clouds"
            ? ("app clouds")
            : weather.weather[0].main === "Haze"
            ? ("app haze")
            : weather.weather[0].main === "Mist"
            ? "app mist"
            : weather.weather[0].main === "Rain"
            ? "app rain"
            : weather.weather[0].main === "Snow"
            ? "app snow"
            : weather.weather[0].description === "thunderstorm"
            ? "app thunder"
            : weather.weather[0].main === "Clear"
            ? "app sun"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="loaction-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div><h1 style={{color:"white"}}>City not found..</h1></div>
        )}
      </main>
    </div>
    </div>
  );
}

export default App;
