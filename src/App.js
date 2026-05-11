import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);

    const apiKey = "284b67e7b5ecc648bed54fe1c188bd5a";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (data.cod === "404") {
      setError("City not found");
      setWeather(null);
    } else {
      setWeather(data);
      setError("");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>React Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>

      {loading && <h3>Loading...</h3>}

      {error && <p>{error}</p>}

      {weather && weather.main && (
        <div className="weather-box">
          <h2>{weather.name}</h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <h1>{weather.main.temp} °C</h1>

          <h3>{weather.weather[0].main}</h3>
        </div>
      )}
    </div>
  );
}

export default App;