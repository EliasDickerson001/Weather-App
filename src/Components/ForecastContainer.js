import React from 'react';
import PropTypes from 'prop-types';
import {ForecastCard} from './ForecastCard';
import {ExpandableForecastList} from "./ExpandableForecastList";
export const ForecastContainer = (props) => {
    let forecast = null;
    console.log(props.displayArray);
    if (props.forecast) {
        forecast = props.forecast.map((day, index) => {
            return day ? 
                (<li onClick={props.listToggle.bind(this, index+1)} className="foreWeatherCard transition" key={day.getDayOfWeek()}>
                    <ForecastCard weather={day}/>
                    <ExpandableForecastList display={props.displayArray[index]} forecast={day}/>
                </li>)
                : null;
        });
    }
    return (
        <ul className="textCenter">
            {forecast}
        </ul>
    );
}
ForecastContainer.propTypes = {
    forecast: PropTypes.array
}