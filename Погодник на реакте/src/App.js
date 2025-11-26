import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');

  const API_KEY = 'YE7CRRRXRQUH9DUF8GAJCCP9T';
  
  const fetchWeather = async (cityName = city) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=${unit}&key=${API_KEY}&contentType=json`
      );
      
      if (!response.ok) {
        throw new Error('Город не найден');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'us' : 'metric';
    setUnit(newUnit);
    if (weatherData && city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Погодный сайт</h1>
          <p>Актуальная погода в любом городе</p>
        </header>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введите город..."
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-btn" 
            disabled={loading || !city.trim()}
          >
            {loading ? 'Поиск...' : 'Найти'}
          </button>
          <button 
            type="button" 
            onClick={toggleUnit} 
            className="unit-toggle"
          >
            °{unit === 'metric' ? 'C' : 'F'}
          </button>
        </form>

        {error && (
          <div className="error">
            ❌ Ошибка: {error}
          </div>
        )}

        {weatherData && (
          <div className="weather-card">
            <div className="current-weather">
              <h2>{weatherData.resolvedAddress}</h2>
              <div className="temp-main">
                {Math.round(weatherData.currentConditions.temp)}°
                {unit === 'metric' ? 'C' : 'F'}
              </div>
              {/* Удален блок с иконкой и описанием погоды */}
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span>💨 Ветер</span>
                <span>{Math.round(weatherData.currentConditions.windspeed)} km/h</span>
              </div>
              <div className="detail-item">
                <span>💧 Влажность</span>
                <span>{weatherData.currentConditions.humidity}%</span>
              </div>
              <div className="detail-item">
                <span>🔆 Давление</span>
                <span>{weatherData.currentConditions.pressure} hPa</span>
              </div>
              <div className="detail-item">
                <span>👁️ Видимость</span>
                <span>{weatherData.currentConditions.visibility} km</span>
              </div>
            </div>

            <div className="forecast">
              <h3>Прогноз на 3 дня:</h3>
              <div className="forecast-list">
                {weatherData.days.slice(0, 3).map((day, index) => (
                  <div key={day.datetime} className="forecast-item">
                    <div className="forecast-date">
                      {index === 0 ? 'Сегодня' : 
                       index === 1 ? 'Завтра' : 
                       new Date(day.datetime).toLocaleDateString('ru-RU', { weekday: 'short' })}
                    </div>
                    <div className="forecast-temp">
                      {Math.round(day.tempmax)}° / {Math.round(day.tempmin)}°
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;