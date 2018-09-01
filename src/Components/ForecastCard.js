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
        <div>
            <h3>{dayName}</h3>
            <h4>{displayWeather}</h4>
            <h5>{loTemp}</h5>
            <h5>{hiTemp}</h5>
        </div>
    )
}