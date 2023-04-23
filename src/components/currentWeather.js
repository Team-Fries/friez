import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import 'weather-react-icons/lib/css/weather-icons.css';
import 'weather-react-icons/lib/css/weather-icons-wind.css';
import { WeatherIcon } from 'weather-react-icons';
import Animal from './animals.js'


export default function CurrentWeather({ lat, long, token }) {
    const [data, setData] = useState([])
    const [weatherIcon, setWeatherIcon] = useState([])
    const [weatherID, setWeatherID] = useState([])

    useEffect(() => {
        if (lat && long) {
            const URL = (`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
            axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
                .then(result => {
                    setData(result.data);
                    setWeatherIcon(result.data.weather[0].icon)
                    setWeatherID(result.data.weather[0].id)
                })
        }
    }, [lat, long, weatherID, token])

    console.log(weatherID)


    return (
        (typeof data.main != 'undefined') ? (

            <div className="weatherCard">
                <div className="header" data-drag-scroll-enabled="true">
                    {data.name}
                </div>
                <div className="cardBody">
                    <div className="tempIconBucket">
                        <div className='icon'>
                            <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt="icon"></img>
                        </div>
                        <div className="temp">
                            {Math.round(data.main.temp)}°F
                        </div>
                    </div>
                    <div className="description">
                        {data.weather[0].description}
                    </div>
                    <div className="highLowBox">
                        <div className="high">
                            ↑ {Math.round(data.main.temp_max)}°F
                        </div>
                        <div className="low">
                            ↓ {Math.round(data.main.temp_min)}°F
                        </div>
                    </div>
                    <div className="humidity">
                        Humidity: {data.main.humidity}%
                    </div>
                    <Animal weatherID={weatherID} />
                </div>
            </div >
        ) : (
            <div> "Loading" </div>
        )
    );

}