import React from 'react';
import {SearchForm} from './SearchForm';
import {CurrWeatherCard} from './CurrWeatherCard';
import {ExpandableForecastList} from "./ExpandableForecastList";
import {DailyWeatherStats} from '../Scripts/WeatherObjects';
import {ForecastContainer} from './ForecastContainer';
export class WeatherInterfaceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            currCity: "",
            currWeather: {},
            foreWeather: [],
            forecastDisplay: ["none","none","none","none","none","none"],
            iconUrl : ""
        }
        this.getWeatherData = this.getWeatherData.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.aggregateCurrentData = this.aggregateCurrentData.bind(this);
        this.aggregateForecastData = this.aggregateForecastData.bind(this);
        this.buildRequestURL = this.buildRequestURL.bind(this);
        this.toggleForecastList = this.toggleForecastList.bind(this);
    }
    componentDidMount(){
        let success = (pos) => {
            this.setState({
                location: pos.coords
            });
            this.getWeatherData(null, "coordinates");
        };
        navigator.geolocation.getCurrentPosition(success);
        // let error = (err) => {
            
        // };
         // navigator.geolocation.getCurrentPosition(success, error);
    }
    getWeatherData(event, locationMethod){
        if (event) {event.preventDefault();}
        // To use application, obtain API key from OpenWeatherMap 
        //Fetch data for current city weather 
        let requestUrl = locationMethod === "coordinates" ? this.buildRequestURL("coordinates", "current") : this.buildRequestURL("city", "current");
        fetch(requestUrl).then(response => response.json())
        .then(json => this.aggregateCurrentData(json),
        networkError => {
            console.log(networkError);
        });
        //Fetch data for forecasted city weather
        requestUrl = locationMethod === "coordinates" ? this.buildRequestURL("coordinates", "forecast") : this.buildRequestURL("city", "forecast");
        fetch(requestUrl).then(response => response.json())
            .then(json => this.aggregateForecastData(json),
        networkError => {
            console.log(networkError);
        });
    }
    aggregateCurrentData(json){
        console.log("Current JSON");
        console.log(json);
        //If code starts with 4, give alert
        if (json.cod[0] === "4"){
            window.alert("City not found!");
            this.props.updateCity("", "");
            this.setState({
                currWeather: {},
                iconUrl: ""
            });
            return
        };
        let weatherStats = {
            curr: Math.round(json.main.temp),
            humidity: Math.round(json.main.humidity),
            // Such as "Rain", "Clouds"
            weathCategory: json.weather[0].main,
            // Such as "Heavy Rain", "Broken Clouds"
            weathCatDesc: json.weather[0].description,
            windSpeed: json.wind.speed,
            windDirection: json.wind.deg
        };
        // Occasionally the forecast data will get returned before the current weather data, make sure 
        // it is not lost if it exists.
        weatherStats.forecast = this.state.currWeather.forecast ? this.state.currWeather.forecast : null;
        this.setState({
            currWeather: weatherStats,
            iconUrl: `http://openweathermap.org/img/w/${json.weather[0].icon}.png`
        });
        this.props.updateCity(json.name, json.sys.country);
    }
    aggregateForecastData(json){
        console.log("Forecast JSON");
        console.log(json);
        let forecastArray = json.list;
        // 5 day forecast provided, stats for every 3 hours, day0 is today
        let day0List = [], day1List = [], day2List = [], day3List = [], day4List = [], day5List = [];
        forecastArray.forEach(forecastItem => {
            // Date is Unix format returned in seconds, convert to miliseconds
            let forecastDayTime = new Date(forecastItem.dt*1000);
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
                default:
                    break;
            }
        });
        let day0 = day0List[0] ? new DailyWeatherStats(day0List) : null;
        let day1 = day1List[0] ? new DailyWeatherStats(day1List) : null;
        let day2 = day2List[0] ? new DailyWeatherStats(day2List) : null;
        let day3 = day3List[0] ? new DailyWeatherStats(day3List) : null;
        let day4 = day4List[0] ? new DailyWeatherStats(day4List) : null;
        let day5 = day5List[0] ? new DailyWeatherStats(day5List) : null;
        //Provide day0 forecast data to currWeather state for display
        let currWeather = this.state.currWeather;
        currWeather.forecast = day0;
        forecastArray = [day1, day2, day3, day4, day5];
        this.setState({
            currWeather: currWeather,
            foreWeather: forecastArray

        });
    }
    onInputChange(event){
        this.setState({
            currCity: event.target.value
        });
    }
    toggleForecastList(day){
        let displayArray = this.state.forecastDisplay;
        if (displayArray[day] === "none") {
            displayArray[day] = "initial";
        } else {
            displayArray[day] = "none";
        }
        this.setState({
            forecastDisplay: displayArray
        });
    }
    buildRequestURL(locationMethod, when){
        // To use application, obtain API key from OpenWeatherMap 
        let apiKey = "***";
        let currWeathCityUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.currCity}&units=imperial&APPID=${apiKey}`;
        let foreWeathCityUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.currCity}&units=imperial&APPID=${apiKey}`;
        let currWeathCoordUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.location.latitude}&lon=${this.state.location.longitude}&units=imperial&APPID=${apiKey}`;
        let foreWeathCoordUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.location.latitude}&lon=${this.state.location.longitude}&units=imperial&APPID=${apiKey}`;
        if (locationMethod === "city") {
            if (when === "current") {
                return currWeathCityUrl;
            } else if (when === "forecast") {
                return foreWeathCityUrl;
            }
        } else if (locationMethod === "coordinates"){
            if (when === "current") {
                return currWeathCoordUrl;
            } else if (when === "forecast") {
                return foreWeathCoordUrl;
            }
        }
    }
    render(){
        return (
            <div>
                <SearchForm onChange={this.onInputChange} onSearch={this.getWeatherData}/>
                <div onClick={this.toggleForecastList.bind(this, 0)} className="currWeatherCard transition">
                    <CurrWeatherCard iconUrl={this.state.iconUrl} weather={this.state.currWeather}/>
                    <ExpandableForecastList display={this.state.forecastDisplay[0]} forecast={this.state.currWeather.forecast?this.state.currWeather.forecast:null}/>
                </div>
                <ForecastContainer displayArray={this.state.forecastDisplay.slice(1)} listToggle={this.toggleForecastList} forecast={this.state.foreWeather}/>
            </div>
        )    
    }
}