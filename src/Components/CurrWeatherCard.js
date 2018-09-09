import React from 'react';
import {Icon} from './Icon';
import {Compass} from './Compass';
export const CurrWeatherCard = (props) => {
    let today = props.weather.forecast ? `${props.weather.forecast.getDayOfWeek()}` : getDayOfWeek();
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
    let windSpeed = props.weather.windSpeed ? `${Math.round(props.weather.windSpeed)}mph` : null;
    let windDirection = props.weather.windDirection ? props.weather.windDirection : null;
    let windCompass = windDirection || windSpeed ? 
        (<ul>
            <li><i>Wind</i></li>
            <li><Compass height={140} width={115} degree={windDirection?windDirection:0}/></li>
            <li>{windSpeed}</li>
        </ul>)
        :null;
    return (
        <div id="currWeatherMain" className="transition">
            <h1 className="cardHeader textCenter topBorderRadius">{today}</h1>
            <ul>
                <li>{category} <br/> {catDescription}</li>
                <li><Icon srcUrl={props.iconUrl}/></li>
                <li>{currTemp}</li>
                <li>{loTemp}</li>
                <li>{hiTemp}</li>
                <li>{humidity}</li>
            </ul>
            {windCompass}
        </div>
    )
}
let getDayOfWeek = () => {
    let date = new Date();
    let dayVal = date.getDay();
    switch (dayVal) {
        case 0:
            return "Sunday";
        case 1:    
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:    
            return "Friday";
        case 6:
            return "Saturday";
        default:
            break;
    }
};