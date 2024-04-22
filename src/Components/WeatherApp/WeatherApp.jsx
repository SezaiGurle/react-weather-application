import React, { useState } from 'react';
import axios from 'axios'; 
import './WeatherApp.css';
import ErrorComponent from '../Error/Error';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import header_icon from '../Assets/header.png';
import temp_icon from '../Assets/temp.png';
import rain2_icon from '../Assets/rain2.png';

export const WeatherApp = () => {
    let api_key = "d936c54fa85a929c1fb472e8361f657d";
    const [wicon, setWicon] = useState();
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        try {
            let response = await axios.get(url); 

            let data = response.data;

            setWeatherData(data);

            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                setWicon(clear_icon);
            }
            else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setWicon(cloud_icon);
            }
            else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                setWicon(drizzle_icon);
            }
            else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
                setWicon(drizzle_icon);
            }
            else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                setWicon(rain_icon);
            }
            else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                setWicon(rain_icon);
            }
            else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                setWicon(snow_icon);
            }
            else {
                setWicon(clear_icon);
            }
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('City not found. Please enter a valid city name.');
            setWeatherData(null);
            setWicon(null);
        }
    };

    const closeError = () => {
        setErrorMessage('');
    };

    return (
        <div className='container'>
            <div className="header">
                <img src={header_icon} alt="" />
                <span>iWeather</span>
            </div>
            <div className="info">
                <h2>Welcome to TypeWeather</h2>
                <p>Choose a location to see the weather forecast</p>
            </div>

            <div className="top-bar">
                <input type='text' className='cityInput' placeholder='Search' />
                <div className='search-icon' onClick={search}>
                    <img src={search_icon} alt="Search" />
                </div>
            </div>
            {errorMessage && <ErrorComponent errorMessage={errorMessage} onClose={closeError} />}
            {weatherData &&
                <div>
                    <div className="weather-image">
                        <img src={wicon} alt="" />
                    </div>
                    <div className="weather-temp">{Math.floor(weatherData.main.temp)}°C</div>
                    <div className="weather-location">{weatherData.name}, {weatherData.sys.country}</div>
                    <div className="data-container">
                        <div className="element">
                            <div className="humidity-percent"></div>
                            <div className="text"><img src={humidity_icon} alt='' />Air humidity:{Math.floor(weatherData.main.humidity)}%</div>
                        </div>
                        <div className="element">
                            <div className="wind-rate"></div>
                            <div className="text"><img src={wind_icon} alt='' />Wind Speed:{Math.floor(weatherData.wind.speed)} km/h</div>
                        </div>
                        <div className="element">
                            <div className="feels"><img src={temp_icon} alt='' />Thermal sensation: {Math.floor(weatherData.main.feels_like)}</div>
                        </div>
                        <div className="element">
                            <div className="clouds"><img src={rain2_icon} alt='' />Probability of rain: {weatherData.clouds.all}%</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};
