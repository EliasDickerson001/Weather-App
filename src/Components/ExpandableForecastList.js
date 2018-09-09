import React from 'react';
import {Icon} from './Icon';
import downArrowImg from "../Assets/downArrowhead.png"
export const ExpandableForecastList = (props) => {
    let list = null;
    if (props.forecast) {
        list = props.forecast.forecastArray.map(forecastIncrement => {
            let date = new Date(forecastIncrement.dt*1000);
            let time = date.getHours();
            time += 1;
            if (time === 12) {
                time = `${time}PM`;
            } else if (time > 12){
                time = `${time-12}PM`;
            } else {
                time = `${time}AM`;
            }
            return forecastIncrement ? 
                (<li className="textCenter" key={forecastIncrement.dt}>
                    {`${time}`}<span className="spacer"/>{`${Math.round(forecastIncrement.main.temp)}°F `}<span className="spacer"/><Icon srcUrl={`http://openweathermap.org/img/w/${forecastIncrement.weather[0].icon}.png`}/>
                </li>)
                : null;
        });
    }
    return (
        <div className="forecastList">
            <div id="arrowIndicator" className="textCenter botBorderRadius">
                <img src={downArrowImg} alt="Down Arrow Head"/>
            </div>
            <ul style={{display:props.display}}>
                {list}
            </ul>
        </div>
    )
};