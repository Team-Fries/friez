import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import 'weather-react-icons/lib/css/weather-icons.css';
import 'weather-react-icons/lib/css/weather-icons-wind.css';
import { WeatherIcon } from 'weather-react-icons';


export default function CurrentWeather({ lat, long }) {
    const [data, setData] = useState([])
    const [weatherIcon, setWeatherIcon] = useState([])

    useEffect(() => {
        if (lat && long) {
            const URL = (`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
            axios.get(URL).then(result => {
                setData(result.data);
                setWeatherIcon(result.data.weather[0].icon)
            })
        }
    }, [lat, long])

    const iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

    return (
        (typeof data.main != 'undefined') ? (

            <div className="weatherCard">
                <div className="header">
                    {data.name}
                </div>
                <div className="cardBody">
                    <div className="temp">
                        {Math.round(data.main.temp)}°F
                    </div>
                    <div className="description">
                        {data.weather[0].description}
                    </div>
                    {/* <div className="icon">
                        <WeatherIcon iconId={weatherIcon} name="owm" />
                    </div> */}

                    <div>
                        {<iconUrl />}
                    </div>
                    <div className="flexBox">
                        <div className="high">
                            High: {Math.round(data.main.temp_max)}°F
                        </div>
                        <div className="low">
                            Low: {Math.round(data.main.temp_min)}°F
                        </div>
                    </div>
                    <div className="humidity">
                        Humidity: {data.main.humidity}%
                    </div>
                </div>
            </div>
        ) : (
            <div> "Loading" </div>
        )
    );

}