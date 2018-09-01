import React from 'react';
import {Icon} from './Icon';
import {Compass} from './Compass';
let containerStyle = {
    width: "30%",
    margin: "auto",
    boxShadow: "5px 5px 5px grey",
    backgroundColor: "rgb(212, 225, 244)"
}
let halfSizeStyle = {
    display: "inline-block",
    width: "50%"
}

export const CurrWeatherCard = (props) => {
    let currTemp = props.weather.curr ? `${props.weather.curr}°F` : null;
    let hiTemp = null;
    if (props.weather.forecast) {
        hiTemp = props.weather.forecast.getHighTemp() < props.weather.curr ? `High ${props.weather.curr}°F`: `High ${props.weather.forecast.getHighTemp()}°F`;
    }
    let loTemp = null;
    if (props.weather.forecast) {
        loTemp = props.weather.forecast.getLowTemp() > props.weather.curr ? `Low ${props.weather.curr}°F`: `Low ${props.weather.forecast.getLowTemp()}°F`;
    }
    let humidity = props.weather.humidity ? `Humidity ${props.weather.humidity}%` : null;
    let category = props.weather.weathCategory ? `${props.weather.weathCategory}` : null;
    let catDescription = props.weather.weathCatDesc ? `${props.weather.weathCatDesc}` : null;
    let windSpeed = props.weather.windSpeed ? `${props.weather.windSpeed}mph` : null;
    let windDirection = props.weather.windDirection ? props.weather.windDirection : null;
    let windCompass = windDirection || windSpeed ? 
    (<div style={halfSizeStyle}>
            <h3><u>Wind</u></h3>
            <Compass height={90} width={75} degree={windDirection?windDirection:0}/>
            <h4>{windSpeed}</h4>
        </div>)
        :null;
    return (
        <div style={containerStyle}>
            <div style={halfSizeStyle}>
                <h2>{category}</h2>
                <h4><i>{catDescription}</i></h4>
                <Icon srcUrl={props.iconUrl}/>
                <h1>{currTemp}</h1>
                {/* TO DO: add keys to list */}
                <ul style={{listStyleType:"none"}}>
                    <li>{loTemp}</li>
                    <li>{hiTemp}</li>
                    <li>{humidity}</li>
                </ul>
            </div>
            {windCompass}
        </div>
    )
}