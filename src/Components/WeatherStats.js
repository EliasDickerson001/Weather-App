import React from 'react';
import {Icon} from './Icon';
import {Compass} from './Compass';
export const WeatherStats = (props) => {
    let currTemp = props.weather.curr ? `${props.weather.curr}°F` : null;
    let loTemp = props.weather.low ? `Low ${props.weather.low}°F` : null;
    let hiTemp = props.weather.high ? `High ${props.weather.high}°F` : null;
    let humidity = props.weather.humidity ? `Humidity ${props.weather.humidity}%` : null;
    let category = props.weather.weathCategory ? `${props.weather.weathCategory}` : null;
    let catDescription = props.weather.weathCatDesc ? `${props.weather.weathCatDesc}` : null;
    let windSpeed = props.weather.windSpeed ? `${props.weather.windSpeed}mph` : null;
    let windDirection = props.weather.windDirection ? `${props.weather.windDirection}` : null;
    let windCompass = props.weather ? 
        ( <div>
            <h3><u>Wind</u></h3>
            <Compass height={90} width={75} degree={windDirection?windDirection:0}/>
            <h4>{windSpeed}</h4>
        </div>):null;
    return (
        <div>
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
            {windCompass}
        </div>
    )
}