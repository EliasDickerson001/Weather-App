import React from 'react';
import {SearchForm} from './SearchForm';
import {WeatherStats} from './WeatherStats';
import {DailyWeatherStats} from '../Scripts/WeatherObjects';

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
        this.aggregateForecastData = this.aggregateForecastData.bind(this);
    }
    getCurrWeatherData(event){
        event.preventDefault();
        // To use application, obtain API key from OpenWeatherMap 
        let apiKey = "5dc1a6d0183b60c9deeb6b1830b72d84";
        //Fetch data for current city weather 
        let requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.currCity}&units=imperial&APPID=${apiKey}`;
        fetch(requestUrl).then(response => response.json())
        .then(json => {
            console.log("Current JSON");
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
        //Fetch data for forecasted city weather
        requestUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.currCity}&units=imperial&APPID=${apiKey}`;
        fetch(requestUrl).then(response => response.json())
        .then(json => this.aggregateForecastData(json));
    }
    aggregateForecastData(json){
        console.log("Forecast JSON");
        console.log(json);
        let forecastArray = json.list;
        let forecastDayTime;
        // 5 day forecast provided, stats for every 3 hours, day0 is today
        let day0List = [], day1List = [], day2List = [], day3List = [], day4List = [], day5List = [];
        forecastArray.forEach(forecastItem => {
            // Date is Unix format returned in seconds, convert to miliseconds
            forecastDayTime = new Date(forecastItem.dt*1000);
            let day = DailyWeatherStats.getForecastPosition(forecastDayTime);
            switch (day) {
                case 0:
                    day0List.push(forecastItem);
                    break;
                case 1:
                    day1List.push(forecastItem);    
                    break;
                case 2:
                    day2List.push(forecastItem);    
                    break;
                case 3:
                    day3List.push(forecastItem);  
                    break;
                case 4:
                    day4List.push(forecastItem);  
                    break;
                case 5:
                    day5List.push(forecastItem);  
                    break;
            }
        });
        let day0 = day0List[0] ? new DailyWeatherStats(day0List) : null;
        let day1 = day1List[0] ? new DailyWeatherStats(day1List) : null;
        let day2 = day2List[0] ? new DailyWeatherStats(day2List) : null;
        let day3 = day3List[0] ? new DailyWeatherStats(day3List) : null;
        let day4 = day4List[0] ? new DailyWeatherStats(day4List) : null;
        let day5 = day5List[0] ? new DailyWeatherStats(day5List) : null;
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