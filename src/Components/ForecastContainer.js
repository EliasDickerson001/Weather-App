import React from 'react';
import PropTypes from 'prop-types';
import {ForecastCard} from './ForecastCard';
let listStyle = {
    listStyleType:"none",
    display:"inline-block",
    width:"90%",
    margin:"auto"
};
let listItemStyle = {
    display:"inline-block", 
    width:"18%", 
    margin:"5px",
    boxShadow: "5px 5px 5px grey"
};
export const ForecastContainer = (props) => {
    let forecast = null;
    if (props.forecast) {
        forecast = props.forecast.map((day) => {
            return day ? 
                (<li key={day.getDayOfWeek()} style={listItemStyle}>
                    <ForecastCard weather={day}/>
                </li>)
                : null;
        });
    }
    return (
        <ul style={listStyle}>
            {forecast}
        </ul>
    );
}
ForecastContainer.propTypes = {
    forecast: PropTypes.array
}