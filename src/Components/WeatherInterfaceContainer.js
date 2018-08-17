import React from 'react';
import {SearchForm} from './SearchForm';
import {WeatherStats} from './WeatherStats';

export class WeatherInterfaceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currCity: "",
            weather: "",
            iconUrl : ""
        }
        this.getCurrWeatherData = this.getCurrWeatherData.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    getCurrWeatherData(event){
        event.preventDefault();
        let apiKey = "5dc1a6d0183b60c9deeb6b1830b72d84";
        let requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.currCity}&units=imperial&APPID=${apiKey}`;
        fetch(requestUrl).then(response => response.json())
        .then(json => {
            console.log(json);
            //If code starts with 4, give alert
            if (json.cod[0] === "4"){
                window.alert("City not found!");
                this.props.updateCity("", "");
                this.setState({
                    weather: "",
                    iconUrl: ""
                });
                return
            };
            let weatherStats = {
                curr: Math.round(json.main.temp),
                low: Math.round(json.main.temp_min),
                high: Math.round(json.main.temp_max),
                humidity: Math.round(json.main.humidity),
                // Such as "Rain", "Clouds"
                weathCategory: json.weather[0].main,
                // Such as "Heavy Rain", "Broken Clouds"
                weathCatDesc: json.weather[0].description,
                windSpeed: json.wind.speed,
                windDirection: json.wind.deg
            };
            this.setState({
                weather: weatherStats,
                iconUrl: `http://openweathermap.org/img/w/${json.weather[0].icon}.png`
            });
            this.props.updateCity(json.name, json.sys.country);
        }
        ,networkError => {
            console.log(networkError);
        });
    }
    onInputChange(event){
        this.setState({
            currCity: event.target.value
        });
    }
    render(){
        return (
            <div>
                <SearchForm onChange={this.onInputChange} onSearch={this.getCurrWeatherData}/>
                <WeatherStats iconUrl={this.state.iconUrl} weather={this.state.weather}/>
            </div>
        )    
    }
}