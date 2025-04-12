import React from 'react';
const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>
      <p>{data.weather[0].description}</p>
      <p>🌡 Temp: {data.main.temp} °C</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
      <p>🌬 Wind: {data.wind.speed} m/s</p>
      <img 
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
        alt="weather icon"
      />
    </div>
  );
};
export default WeatherCard;
