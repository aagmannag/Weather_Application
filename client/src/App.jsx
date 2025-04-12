import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [theme, setTheme] = useState('dark'); 
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
  }, []);
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeatherData(res.data);
      setError('');
      setSearchHistory((prevHistory) => {
        const newHistory = prevHistory.filter((item) => item.toLowerCase() !== city.toLowerCase());
        newHistory.unshift(city);
        return newHistory.slice(0, 5);
      });
    } catch (err) {
      setWeatherData(null);
      setError('Could not fetch weather data. Try again.');
    }
  };
  const clearHistory = () => {
    setSearchHistory([]);
  };
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`app ${theme}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
      {searchHistory.length > 0 && (
        <div className="search-history">
          <h3>Recent Searches</h3>
          <ul>
            {searchHistory.map((city, index) => (
              <li key={index}>
                <button onClick={() => fetchWeather(city)}>{city}</button>
              </li>
            ))}
          </ul>
          <button className="clear-history" onClick={clearHistory}>
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
