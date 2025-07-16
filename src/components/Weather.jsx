import React, { useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '9c9a27d10ed4467c882112110251607';

  const fetchWeather = async () => {
    if (!city) return;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.error) {
        setWeatherData(data);
      } else {
        alert('City not found');
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
    }
  };

  return (
    <div className='weather'>
      <div className="search-bar">
        <input
          type='text'
          placeholder='Search'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={search_icon} alt="" onClick={fetchWeather} />
      </div>

      <img src={clear_icon} alt="" className='weather-icon' />
      
      <p className='temperature'>
        {weatherData ? `${weatherData.current.temp_c}°C` : '16°C'}
      </p>
      <p className='location'>
        {weatherData ? weatherData.location.name : 'London'}
      </p>

      <div className='weather-data'>
        <div className='col'>
          <img src={humidity_icon} alt='' />
          <div>
            <p>{weatherData ? `${weatherData.current.humidity} %` : '91 %'}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt='' />
          <div>
            <p>{weatherData ? `${weatherData.current.wind_kph} Km/h` : '3.6 Km/h'}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
