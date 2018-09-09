import React from 'react';
export const ForecastCard = (props) => {
    let dayName = props.weather ? props.weather.getDayOfWeek() : null;
    let primaryWeather = props.weather ? props.weather.getProminentWeather() : null;
    let displayWeather = null;
    primaryWeather.forEach((weatherCat) => {
        !displayWeather ? displayWeather = weatherCat : displayWeather += `/${weatherCat}`;
    });
    let loTemp = props.weather ? `Low ${props.weather.getLowTemp()}°F` : null;
    let hiTemp = props.weather ? `High ${props.weather.getHighTemp()}°F` : null;
    // let rain = props.weather ? props.weather.chanceOfRain() : null;
    return (
        <ul id="foreWeatherMain" className="noBullets textCenter transition">
            <li className="cardHeader topBorderRadius">{dayName}</li>
            <li>{displayWeather}</li>
            <li>{loTemp}</li>
            <li>{hiTemp}</li>
        </ul>
    )
}